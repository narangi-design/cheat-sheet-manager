<script setup lang="ts">
import { ref } from 'vue'
import { supabase, userUuid } from '../../utils/supabase'

const props = defineProps<{
  imageUrl: string
}>()

const editedImageUrl = ref(props.imageUrl)
const isUploading = ref(false)
const uploadError = ref<string | null>(null)

async function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  isUploading.value = true
  uploadError.value = null

  const ext = file.name.split('.').pop()
  const path = `${userUuid}/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from('Images').upload(path, file)

  if (error) {
    uploadError.value = error.message
  } else {
    const { data } = supabase.storage.from('Images').getPublicUrl(path)
    editedImageUrl.value = data.publicUrl
  }

  isUploading.value = false
}

defineExpose({ editedImageUrl })
</script>

<template>
  <div class="upload-zone">
    <img v-if="editedImageUrl" :src="editedImageUrl" class="preview" />
    <label class="upload-button">
      {{ isUploading ? 'Uploading…' : editedImageUrl ? 'Replace image' : 'Choose image' }}
      <input type="file" accept="image/*" @change="onFileChange" hidden />
    </label>
    <span v-if="uploadError" class="error">{{ uploadError }}</span>
  </div>
</template>

<style scoped>
.upload-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  border: var(--border-default);
}

.preview {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.upload-button {
  padding: var(--space-xs) var(--space-md);
  border: var(--border-default);
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.upload-button:hover {
  background-color: var(--color-neutral-100);
}

.error {
  color: red;
  font-size: var(--font-size-sm);
}
</style>
