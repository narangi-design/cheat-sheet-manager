<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  imageUrl: string
}>()

const editedImageUrl = ref(props.imageUrl)

defineExpose({ editedImageUrl })
</script>

<template>
  <input :value="editedImageUrl" @input="(event) => (editedImageUrl = (event.target as HTMLInputElement).value)" />
</template>