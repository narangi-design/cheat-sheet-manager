<script setup lang="ts">
import type { TextNoteData } from '../../types'

defineProps<{ note: TextNoteData }>()
</script>

<template>
  <div class="text-note-content" v-html="note.content" />
</template>

<style scoped>
.text-note-content :deep(code) {
  background-color: var(--color-neutral-100);
  color: var(--color-primary);
  padding: 0.1em 0.3em;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
}

.text-note-content :deep(pre) {
  background-color: var(--color-gray-200);
  color: var(--color-neutral-100);
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  overflow-x: auto;
}

.text-note-content :deep(pre code) {
  background: none;
  color: inherit;
  padding: 0;
}

.text-note-content :deep(blockquote) {
  border-left: var(--border-accent);
  padding-left: var(--space-sm);
  color: var(--color-text-muted);
}

.text-note-content :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}

.text-note-content :deep(ul),
.text-note-content :deep(ol) {
  padding-left: var(--space-lg);
}

.text-note-content :deep(> * + *) {
  margin-top: var(--space-xs);
}
</style>