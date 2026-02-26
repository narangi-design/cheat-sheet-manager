<script setup lang="ts">
import { computed } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table/table'
import { TableRow } from '@tiptap/extension-table/row'
import { TableCell } from '@tiptap/extension-table/cell'
import { TableHeader } from '@tiptap/extension-table/header'
import { Extension } from '@tiptap/core'
import FormattingBubbleMenu from './FormattingBubbleMenu.vue'
import addRowIcon from '../../assets/icons/add-row.svg?raw'
import delRowIcon from '../../assets/icons/del-row.svg?raw'
import addColIcon from '../../assets/icons/add-col.svg?raw'
import delColIcon from '../../assets/icons/del-col.svg?raw'

const props = defineProps<{
  content: string
}>()

const MAX_COLS = 4

const TableKeymap = Extension.create({
  name: 'tableKeymap',
  addKeyboardShortcuts() {
    return {
      'Mod-k': ({ editor }) => {
        if (editor.isActive('link')) {
          editor.chain().focus().unsetLink().run()
        } else {
          const url = window.prompt('URL')
          if (url) editor.chain().focus().setLink({ href: url }).run()
        }
        return true
      },

      // At the very start of a cell: prevent backspace from merging/leaving
      Backspace: ({ editor }) => {
        if (!editor.isActive('table')) return false
        const { $anchor } = editor.state.selection
        if ($anchor.parentOffset !== 0) return false
        if ($anchor.index($anchor.depth - 1) !== 0) return false
        return true
      },
    }
  },
})

const RestrictedTableCell = TableCell.extend({ content: 'paragraph+' })
const RestrictedTableHeader = TableHeader.extend({ content: 'paragraph+' })

const editor = useEditor({
  content: props.content || undefined,
  extensions: [
    StarterKit.configure({
      bulletList: false,
      orderedList: false,
      blockquote: false,
      codeBlock: false,
      heading: false,
      gapcursor: false,
    }),
    Link.configure({ openOnClick: false }),
    TableKeymap,
    Table.configure({ resizable: false }),
    TableRow,
    RestrictedTableCell,
    RestrictedTableHeader,
  ],
  onCreate({ editor }) {
    if (!props.content) {
      editor.chain().focus().insertTable({ rows: 3, cols: 2, withHeaderRow: true }).run()
    }
  },
})

const colCount = computed(() => {
  if (!editor.value) return 0
  let count = 0
  editor.value.state.doc.descendants(node => {
    if (node.type.name === 'tableRow') {
      count = node.childCount
      return false
    }
    return true
  })
  return count
})

defineExpose({
  get editedContent() {
    return editor.value?.getHTML() ?? props.content
  },
})
</script>

<template>
  <div class="table-editor-wrap">
    <FormattingBubbleMenu v-if="editor" :editor="editor" :lists="false" :code-block="false" :blockquote="false" />
    <div class="toolbar" v-if="editor">
      <button
        type="button"
        title="Add row below"
        @click="editor.chain().focus().addRowAfter().run()"
        v-html="addRowIcon"
      />
      <button
        type="button"
        title="Delete row"
        @click="editor.chain().focus().deleteRow().run()"
        v-html="delRowIcon"
      />
      <button
        type="button"
        title="Add column (max 4)"
        :disabled="colCount >= MAX_COLS"
        @click="editor.chain().focus().addColumnAfter().goToNextCell().run()"
        v-html="addColIcon"
      />
      <button
        type="button"
        title="Delete column"
        @click="editor.chain().focus().deleteColumn().run()"
        v-html="delColIcon"
      />
    </div>
    <EditorContent :editor="editor" class="editor-content" />
  </div>
</template>

<style scoped>
.table-editor-wrap {
  border: var(--border-default);
  overflow: hidden;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs);
  border-bottom: var(--border-default);
  background-color: var(--color-bg);
}

.toolbar button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1.75rem;
  padding: var(--space-xs);
  border: none;
  background-color: transparent;
  color: var(--color-text);
  cursor: pointer;
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.toolbar button :deep(svg) {
  width: auto;
  height: 1rem;
}

.toolbar button:hover {
  background-color: var(--color-slate-100);
}

.toolbar button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.editor-content {
  padding: var(--space-sm);
}

.editor-content :deep(.tiptap) {
  outline: none;
}

.editor-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}

.editor-content :deep(th),
.editor-content :deep(td) {
  border: var(--border-default);
  padding: var(--space-xs) var(--space-sm);
  vertical-align: top;
  min-width: 4rem;
}

.editor-content :deep(th) {
  background-color: var(--color-bg);
  font-weight: var(--font-weight-semibold);
}

.editor-content :deep(th p),
.editor-content :deep(td p) {
  margin: 0;
}

.editor-content :deep(.selectedCell) {
  background-color: var(--color-slate-100);
}

.editor-content :deep(code) {
  background-color: var(--color-neutral-100);
  color: var(--color-primary);
  padding: 0.1em 0.3em;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
}

.editor-content :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}
</style>
