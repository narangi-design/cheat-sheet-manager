<script setup lang="ts">
import type { ImageNoteData } from '../types'

defineProps<{ note: ImageNoteData }>()
</script>

<template>
  <img :src="note.imageUrl" />
</template>
