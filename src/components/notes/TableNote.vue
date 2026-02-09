<script setup lang="ts">
import type { TableNoteData } from '../types'

defineProps<{ note: TableNoteData }>()
</script>

<template>
  <table>
    <tbody>
      <tr v-for="(row, rowIndex) in note.rows" :key="rowIndex">
        <template v-for="(cell, cellIndex) in row" :key="cellIndex">
          <td v-if="cellIndex < note.cols">{{ cell }}</td>
        </template>
      </tr>
    </tbody>
  </table>
</template>
