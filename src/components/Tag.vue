<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <span class="tag">{{ label }}</span>
</template>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  padding: var(--space-sm);
  background-color: var(--color-sage-100);
  color: var(--color-sage-500);
  font-size: var(--font-size-xs);
  font-weight: 600;
  line-height: 1;
}
</style>
