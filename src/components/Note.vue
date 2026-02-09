<script setup lang="ts">
import Tag from './Tag.vue'
import TextNote from './TextNote.vue'
import TableNote from './TableNote.vue'
import ImageNote from './ImageNote.vue'
import type { NoteData } from '../types'

const props = defineProps<NoteData>()
</script>

<template>
  <div class="note">
    <h3>{{ props.title || '' }}</h3>
    <TextNote v-if="props.type === 'text'" :note="props" />
    <TableNote v-else-if="props.type === 'table'" :note="props" />
    <ImageNote v-else-if="props.type === 'image'" :note="props" />
    <Tag />
  </div>
</template>

<style scoped>
.note {
  padding: 20px;
  margin: 20px;
  background-color: darkgrey;
  color: black;
}
</style>
