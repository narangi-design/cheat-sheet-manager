<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  content: string
}>()

const editedContent = ref(props.content)

defineExpose({ editedContent })
</script>

<template>
  <input :value="editedContent" @input="(event) => (editedContent = (event.target as HTMLInputElement).value)" />
</template>
