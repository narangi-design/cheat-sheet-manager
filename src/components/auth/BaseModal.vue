<script setup lang="ts">
defineProps<{ title?: string }>()
defineEmits<{ close: [] }>()
</script>

<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <h2 v-if="title" class="modal-title">{{ title }}</h2>
      <slot />
    </div>
  </div>
</template>

<style scoped>
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
  width: 100%;
  max-width: 400px;
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.modal-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

:deep(input) {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: var(--border-default);
  font-size: var(--font-size-sm);
  font-family: inherit;
  background-color: var(--color-surface);
  color: var(--color-text);
}

:deep(input:focus) {
  outline: none;
  box-shadow: var(--shadow-focus);
}

:deep(.password-field) {
  position: relative;
}

:deep(.password-field input) {
  padding-right: 4rem;
}

:deep(.toggle-password) {
  position: absolute;
  right: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  border: none;
  background: none;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  cursor: pointer;
}

:deep(button[type='submit']) {
  padding: var(--space-sm) var(--space-md);
  border: none;
  background-color: var(--color-primary);
  color: var(--color-surface);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: background-color var(--transition-base);
}

:deep(button[type='submit']:hover:not(:disabled)) {
  background-color: var(--color-primary-hover);
}

:deep(button[type='submit']:disabled) {
  opacity: 0.6;
  cursor: default;
}

:deep(.error) {
  font-size: var(--font-size-sm);
  color: var(--color-error);
  margin-top: var(--space-xs);
}
</style>
