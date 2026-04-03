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
      <div class="modal-header">
        <input
          class="title-input"
          :value="editedTitle"
          @input="(e) => (editedTitle = (e.target as HTMLInputElement).value)"
          placeholder="Name your note"
        />
      </div>

      <div class="modal-body">
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
      </div>

      <div class="modal-footer">
        <button class="cancel-btn" @click="emit('close')">Cancel</button>
        <button class="save-btn" @click="handleSave">Save</button>
      </div>
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
  width: min(90vw, 680px);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xl);
}
</style>

<style scoped>
.modal-header {
  padding: var(--space-lg) var(--space-xl) var(--space-md);
  border-bottom: var(--border-default);
}

.title-input {
  width: 100%;
  border: none;
  outline: none;
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-heading);
  background: transparent;
  padding: 0;
}

.title-input::placeholder {
  color: var(--color-text-muted);
  font-weight: var(--font-weight-normal);
}

.modal-body {
  padding: var(--space-lg) var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.modal-footer {
  padding: var(--space-md) var(--space-xl);
  border-top: var(--border-default);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-sm);
}

.cancel-btn {
  padding: var(--space-sm) var(--space-md);
  border: none;
  background: none;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  cursor: pointer;
}

.cancel-btn:hover {
  color: var(--color-text);
}

.save-btn {
  padding: var(--space-sm) var(--space-xl);
  border: none;
  background-color: var(--color-primary);
  color: var(--color-surface);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: background-color var(--transition-base);
}

.save-btn:hover {
  background-color: var(--color-primary-hover);
}
</style>
