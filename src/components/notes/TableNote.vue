<script setup lang="ts">
import type { TableNoteData } from '../../types'

defineProps<{ note: TableNoteData }>()
</script>

<template>
  <div class="table-note-content" v-html="note.content" />
</template>

<style scoped>
.table-note-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}

.table-note-content :deep(th),
.table-note-content :deep(td) {
  border: var(--border-default);
  padding: var(--space-xs) var(--space-sm);
  vertical-align: top;
}

.table-note-content :deep(th) {
  background-color: var(--color-bg);
  font-weight: var(--font-weight-semibold);
}

.table-note-content :deep(th p),
.table-note-content :deep(td p) {
  margin: 0;
}

.table-note-content :deep(code) {
  background-color: var(--color-neutral-100);
  color: var(--color-primary);
  padding: 0.1em 0.3em;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
}

.table-note-content :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}
</style>