<script setup lang="ts">
import { BubbleMenu } from '@tiptap/vue-3/menus'
import type { Editor } from '@tiptap/core'
import {
  Bold,
  Italic,
  Code,
  CodeXml,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
} from 'lucide-vue-next'

const props = defineProps<{
  editor: Editor
  lists?: boolean
  codeBlock?: boolean
  blockquote?: boolean
}>()

function bubbleShouldShow({ editor }: { editor: Editor }) {
  return editor.isActive('link') || !editor.state.selection.empty
}

function toggleLink() {
  if (props.editor.isActive('link')) {
    props.editor.chain().focus().unsetLink().run()
  } else {
    const url = window.prompt('URL')
    if (url) props.editor.chain().focus().setLink({ href: url }).run()
  }
}
</script>

<template>
  <BubbleMenu class="bubble-menu" :editor="editor" :should-show="bubbleShouldShow">
    <button
      type="button"
      title="Bold (Ctrl+B)"
      :class="{ active: editor.isActive('bold') }"
      @click="editor.chain().focus().toggleBold().run()"
    >
      <Bold />
    </button>
    <button
      type="button"
      title="Italic (Ctrl+I)"
      :class="{ active: editor.isActive('italic') }"
      @click="editor.chain().focus().toggleItalic().run()"
    >
      <Italic />
    </button>
    <button
      type="button"
      title="Inline Code (Ctrl+E)"
      :class="{ active: editor.isActive('code') }"
      @click="editor.chain().focus().toggleCode().run()"
    >
      <Code />
    </button>
    <button
      v-if="codeBlock !== false"
      type="button"
      title="Code Block (Ctrl+Alt+C)"
      :class="{ active: editor.isActive('codeBlock') }"
      @click="editor.chain().focus().toggleCodeBlock().run()"
    >
      <CodeXml />
    </button>
    <button
      v-if="lists !== false"
      type="button"
      title="Bullet List (Ctrl+Shift+8)"
      :class="{ active: editor.isActive('bulletList') }"
      @click="editor.chain().focus().toggleBulletList().run()"
    >
      <List />
    </button>
    <button
      v-if="lists !== false"
      type="button"
      title="Ordered List (Ctrl+Shift+7)"
      :class="{ active: editor.isActive('orderedList') }"
      @click="editor.chain().focus().toggleOrderedList().run()"
    >
      <ListOrdered />
    </button>
    <button
      v-if="blockquote !== false"
      type="button"
      title="Blockquote (Ctrl+Shift+B)"
      :class="{ active: editor.isActive('blockquote') }"
      @click="editor.chain().focus().toggleBlockquote().run()"
    >
      <Quote />
    </button>
    <button
      type="button"
      title="Link (Ctrl+K)"
      :class="{ active: editor.isActive('link') }"
      @click="toggleLink"
    >
      <LinkIcon />
    </button>
  </BubbleMenu>
</template>

<style scoped>
.bubble-menu {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 2px;
  background-color: var(--color-surface);
  border: var(--border-default);
  box-shadow: var(--shadow-md);
}

.bubble-menu button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: var(--space-xs);
  border: none;
  background-color: transparent;
  color: var(--color-text);
  cursor: pointer;
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.bubble-menu button :deep(svg) {
  width: 1rem;
  height: 1rem;
}

.bubble-menu button:hover {
  background-color: var(--color-gray-100);
}

.bubble-menu button.active {
  background-color: var(--color-primary);
  color: var(--color-surface);
}
</style>
