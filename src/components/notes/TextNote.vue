<script setup lang="ts">
import type { TextNoteData } from '../../types'

defineProps<{ note: TextNoteData }>()
</script>

<template>
  <span>{{ note.content }}</span>
</template>
