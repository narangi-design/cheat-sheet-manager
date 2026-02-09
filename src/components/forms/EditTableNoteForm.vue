<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  cols: number
  rows: string[][]
}>()

const editedCols = ref(props.cols)
const editedRows = ref(props.rows.map(row => [...row]))

defineExpose({ editedCols, editedRows })
</script>

<template></template>