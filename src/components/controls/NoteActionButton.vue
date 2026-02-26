<script setup lang="ts">
defineProps<{
  label: string
  icon: string
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="note-action-button"
    :aria-label="label"
    :title="label"
    @click="emit('click')"
  >
    <span class="icon" v-html="icon" />
  </button>
</template>

<style scoped>
.note-action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background-color: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color var(--transition-fast),
              background-color var(--transition-fast);
}

.note-action-button:hover {
  color: var(--color-primary-hover);
  background-color: var(--color-gray-100);
}

.note-action-button:active {
  color: var(--color-primary-hover);
  background-color: var(--color-slate-100);
}

.icon {
  display: flex;
  width: 0.875rem;
  height: 0.875rem;
}

.icon :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>