<script setup lang="ts">
import { ref } from 'vue'
import EditTextNoteForm from './EditTextNoteForm.vue'
import EditTableNoteForm from './EditTableNoteForm.vue'
import EditImageNoteForm from './EditImageNoteForm.vue'
import TagInput from '../controls/TagInput.vue'
import { NOTE_TYPES, type NoteData } from '../../types'
import { useNotesStore } from '../../stores/notes'

const props = defineProps<{
  note: NoteData
}>()

const emit = defineEmits<{
  close: []
}>()

const store = useNotesStore()
const isExisting = store.notes.some(n => n.id === props.note.id)
const editedTitle = ref(props.note.title ?? '')
const editedTags = ref([...props.note.tags])
const textFormRef = ref<InstanceType<typeof EditTextNoteForm> | null>(null)
const tableFormRef = ref<InstanceType<typeof EditTableNoteForm> | null>(null)
const imageFormRef = ref<InstanceType<typeof EditImageNoteForm> | null>(null)

function buildNote(): NoteData {
  const base = { ...props.note, title: editedTitle.value || null, tags: editedTags.value }

  switch (base.type) {
    case NOTE_TYPES.TEXT:
      if (textFormRef.value) base.content = textFormRef.value.editedContent
      return base
    case NOTE_TYPES.TABLE:
      if (tableFormRef.value) base.content = tableFormRef.value.editedContent
      return base
    case NOTE_TYPES.IMAGE:
      if (imageFormRef.value) base.imageUrl = imageFormRef.value.editedImageUrl
      return base
  }
}

function handleSave() {
  const note = buildNote()

  if (isExisting) {
    store.updateNote(note.id, note)
  } else {
    store.addNote(note)
  }

  emit('close')
}
</script>

<template>
  <div :class="$style.overlay" @click.self="emit('close')">
    <div :class="$style.modal">
      <input
        :value="editedTitle"
        @input="(event) => (editedTitle = (event.target as HTMLInputElement).value)"
        placeholder="Name your note"
      />
      <EditTextNoteForm
        v-if="note.type === NOTE_TYPES.TEXT"
        ref="textFormRef"
        :content="note.content"
      />
      <EditTableNoteForm
        v-if="note.type === NOTE_TYPES.TABLE"
        ref="tableFormRef"
        :content="note.content"
      />
      <EditImageNoteForm
        v-if="note.type === NOTE_TYPES.IMAGE"
        ref="imageFormRef"
        :imageUrl="note.imageUrl"
      />
      <TagInput v-model="editedTags" :suggestions="store.allTags" />
      <button @click="handleSave">Save</button>
    </div>
  </div>
</template>

<style module>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(79, 84, 88, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background-color: var(--color-surface);
  border: var(--border-default);
  padding: var(--space-xl);
  min-width: 400px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  box-shadow: var(--shadow-xl);

  input {
    border: var(--border-default);
  }

  input:focus {
    border: var(--border-default);
  }
}
</style>
