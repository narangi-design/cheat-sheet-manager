<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table/table'
import { TableRow } from '@tiptap/extension-table/row'
import { TableCell } from '@tiptap/extension-table/cell'
import { TableHeader } from '@tiptap/extension-table/header'
import { Extension } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { Plugin, TextSelection } from '@tiptap/pm/state'
import FormattingBubbleMenu from './FormattingBubbleMenu.vue'
import TableHeaderNodeView from './TableHeaderNodeView.vue'

const props = defineProps<{
  content: string
}>()

const TableKeymap = Extension.create({
  name: 'tableKeymap',
  priority: 200,
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

      'Mod-Backspace': ({ editor }) => {
        if (!editor.isActive('table')) return false
        const { $anchor } = editor.state.selection
        let rowDepth = -1
        for (let d = $anchor.depth; d >= 0; d--) {
          if ($anchor.node(d).type.name === 'tableRow') { rowDepth = d; break }
        }
        if (rowDepth === -1) return false
        const targetRowIndex = Math.max(0, $anchor.index(rowDepth - 1) - 1)
        return editor.chain()
          .deleteRow()
          .command(({ state, dispatch }) => {
            let targetPos = -1
            let rowCount = 0
            state.doc.descendants((node, pos) => {
              if (targetPos !== -1) return false
              if (node.type.name === 'tableRow') {
                if (rowCount === targetRowIndex) {
                  node.forEach((_, offset) => {
                    if (targetPos === -1) targetPos = pos + 1 + offset + 1
                  })
                  return false
                }
                rowCount++
              }
            })
            if (targetPos === -1) return false
            if (dispatch) dispatch(state.tr.setSelection(TextSelection.create(state.doc, targetPos)))
            return true
          })
          .run()
      },

      ArrowDown: ({ editor }) => {
        if (!editor.isActive('table')) return false
        const { $anchor } = editor.state.selection
        let rowDepth = -1
        for (let d = $anchor.depth; d >= 0; d--) {
          if ($anchor.node(d).type.name === 'tableRow') { rowDepth = d; break }
        }
        if (rowDepth === -1) return false
        const isLastRow = $anchor.index(rowDepth - 1) === $anchor.node(rowDepth - 1).childCount - 1
        return isLastRow
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
  addProseMirrorPlugins() {
    return [
      new Plugin({
        appendTransaction(_trs, oldState, newState) {
          if (newState.selection.eq(oldState.selection)) return null

          const { doc, selection } = newState
          const $pos = doc.resolve(selection.from)

          for (let d = $pos.depth; d >= 0; d--) {
            if ($pos.node(d).type.name === 'table') return null
          }

          let firstCellPos = -1
          doc.descendants((node, pos) => {
            if (firstCellPos !== -1) return false
            if (node.type.name === 'tableHeader' || node.type.name === 'tableCell') {
              firstCellPos = pos + 1
              return false
            }
          })

          if (firstCellPos === -1) return null
          return newState.tr.setSelection(TextSelection.create(doc, firstCellPos))
        },
      }),
    ]
  },
})

const RestrictedTableCell = TableCell.extend({ content: 'paragraph+' })
const InteractiveTableHeader = TableHeader.extend({
  content: 'paragraph+',
  addNodeView: () => VueNodeViewRenderer(TableHeaderNodeView),
})

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
    InteractiveTableHeader,
  ],
  onCreate({ editor }) {
    if (!props.content) {
      editor.chain().focus().insertTable({ rows: 3, cols: 2, withHeaderRow: true }).run()
    }
  },
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
    <EditorContent :editor="editor" class="editor-content" />
  </div>
</template>

<style scoped>

.editor-content :deep(.tiptap) {
  outline: none;
}

.editor-content :deep(.tiptap > p:empty) {
  display: none;
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
