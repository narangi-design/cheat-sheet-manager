<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { Extension } from '@tiptap/core'
import FormattingBubbleMenu from './FormattingBubbleMenu.vue'

const props = defineProps<{
  content: string
}>()

const LinkShortcut = Extension.create({
  name: 'linkShortcut',
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
    }
  },
})

const editor = useEditor({
  content: props.content,
  extensions: [StarterKit, Link.configure({ openOnClick: false }), LinkShortcut],
})

defineExpose({
  get editedContent() {
    return editor.value?.getHTML() ?? props.content
  },
})
</script>

<template>
  <div class="editor-wrap">
    <FormattingBubbleMenu v-if="editor" :editor="editor" />
    <EditorContent :editor="editor" class="editor-content" />
  </div>
</template>

<style scoped>
.editor-wrap {
  border: var(--border-default);
  overflow: hidden;
}

.editor-content {
  padding: var(--space-sm);
  min-height: 8rem;
}

.editor-content :deep(.tiptap) {
  outline: none;
  min-height: 8rem;
}

.editor-content :deep(.tiptap > * + *) {
  margin-top: var(--space-xs);
}

.editor-content :deep(code) {
  background-color: var(--color-neutral-100);
  color: var(--color-primary);
  padding: 0.1em 0.3em;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
}

.editor-content :deep(pre) {
  background-color: var(--color-gray-100);
  color: var(--color-text);
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  overflow-x: auto;
}

.editor-content :deep(pre code) {
  background: none;
  color: inherit;
  padding: 0;
  font-size: var(--font-size-sm);
}

.editor-content :deep(blockquote) {
  border-left: var(--border-accent);
  padding-left: var(--space-sm);
  color: var(--color-text-muted);
}

.editor-content :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}

.editor-content :deep(ul),
.editor-content :deep(ol) {
  padding-left: var(--space-lg);
}
</style>
