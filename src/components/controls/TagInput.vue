<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: string[]
  suggestions: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const inputValue = ref('')
const dropdownOpen = ref(false)

const filteredSuggestions = computed(() => {
  const q = inputValue.value.toLowerCase()
  return props.suggestions.filter(s =>
    !props.modelValue.some(t => t.toLowerCase() === s.toLowerCase()) &&
    s.toLowerCase().includes(q)
  )
})

function addTag(raw: string) {
  const trimmed = raw.trim()
  if (!trimmed) return
  const canonical = props.suggestions.find(s => s.toLowerCase() === trimmed.toLowerCase()) ?? trimmed
  if (props.modelValue.some(t => t.toLowerCase() === canonical.toLowerCase())) {
    inputValue.value = ''
    return
  }
  emit('update:modelValue', [...props.modelValue, canonical])
  inputValue.value = ''
}

function removeTag(tag: string) {
  emit('update:modelValue', props.modelValue.filter(t => t !== tag))
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
    addTag(filteredSuggestions.value[0] ?? inputValue.value)
  } else if (e.key === 'Backspace' && inputValue.value === '') {
    removeTag(props.modelValue[props.modelValue.length - 1])
  } else if (e.key === 'Escape') {
    dropdownOpen.value = false
  }
}

function onBlur() {
  setTimeout(() => { dropdownOpen.value = false }, 150)
}
</script>

<template>
  <div class="tag-input">
    <div class="chips-row" @click="inputRef?.focus()">
      <span v-for="tag in modelValue" :key="tag" class="chip">
        {{ tag }}
        <button type="button" class="chip-remove" @click.stop="removeTag(tag)" aria-label="Remove tag">×</button>
      </span>
      <input
        ref="inputRef"
        v-model="inputValue"
        class="tag-text-input"
        placeholder="Add tag…"
        @keydown="onKeydown"
        @focus="dropdownOpen = true"
        @blur="onBlur"
      />
    </div>
    <ul v-if="dropdownOpen && filteredSuggestions.length" class="dropdown">
      <li
        v-for="suggestion in filteredSuggestions"
        :key="suggestion"
        @mousedown.prevent="addTag(suggestion)"
      >{{ suggestion }}</li>
    </ul>
  </div>
</template>

<style scoped>
.tag-input {
  position: relative;
}

.chips-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-xs);
  min-height: 2rem;
  padding: var(--space-xs) var(--space-sm);
  border: var(--border-default);
  cursor: text;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
  padding: 0.35em var(--space-sm);
  background-color: var(--color-sage-100);
  color: var(--color-sage-500);
  border: 1px solid var(--color-sage-200);
  font-size: var(--font-size-xs);
  line-height: 1;
}

.chip-remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 0.9em;
  height: 0.9em;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  font-size: 1em;
  cursor: pointer;
  line-height: 1;
}

.chip-remove:hover {
  color: var(--color-text);
}

.tag-text-input {
  flex: 1;
  min-width: 6rem;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: var(--font-size-sm);
  color: var(--color-text);
  padding: 0;
}

.tag-text-input::placeholder {
  color: var(--color-text-muted);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0;
  padding: var(--space-xs) 0;
  list-style: none;
  background-color: var(--color-surface);
  border: var(--border-default);
  border-top: none;
  box-shadow: var(--shadow-md);
  z-index: 10;
}

.dropdown li {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  color: var(--color-text);
}

.dropdown li:hover {
  background-color: var(--color-neutral-100);
}
</style>
