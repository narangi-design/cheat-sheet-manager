<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import NoteActionButton from '../controls/NoteActionButton.vue'
import addColIcon from '../../assets/icons/add-col.svg?raw'
import delColIcon from '../../assets/icons/del-col.svg?raw'

const props = defineProps(nodeViewProps)

function addColumn() {
  const pos = props.getPos?.()
  if (typeof pos !== 'number') return
  props.editor.chain().focus().setTextSelection(pos + 1).addColumnAfter().run()
}

function deleteColumn() {
  const pos = props.getPos?.()
  if (typeof pos !== 'number') return
  props.editor.chain().focus().setTextSelection(pos + 1).deleteColumn().run()
}
</script>

<template>
  <NodeViewWrapper as="th" class="col-header">
    <NodeViewContent />
    <div class="col-controls">
      <NoteActionButton label="Add column after" :icon="addColIcon" @click="addColumn" />
      <NoteActionButton label="Delete column" :icon="delColIcon" @click="deleteColumn" />
    </div>
  </NodeViewWrapper>
</template>

<style scoped>
.col-header {
  position: relative;
}

.col-controls {
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  gap: 2px;
  padding: 2px;
  background-color: var(--color-surface);
}

.col-header:hover .col-controls {
  display: flex;
}
</style>
