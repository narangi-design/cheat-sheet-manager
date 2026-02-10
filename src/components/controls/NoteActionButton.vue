<script setup lang="ts">
defineProps<{
  label: string
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button class="note-action-button" @click="emit('click')">
    {{ label }}
  </button>
</template>