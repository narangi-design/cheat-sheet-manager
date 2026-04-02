<script setup lang="ts">
import { ref } from 'vue'
import OAuthButton from './OAuthButton.vue'

const emit = defineEmits<{
  submit: [email: string]
  oauth: [provider: 'google' | 'github']
  register: []
}>()

const email = ref('')
</script>

<template>
  <div class="email-form">
    <h2 class="title">Welcome</h2>

    <div class="oauth-buttons">
      <OAuthButton provider="google" @click="emit('oauth', 'google')" />
    </div>

    <div class="divider">
      <span>or</span>
    </div>

    <form @submit.prevent="emit('submit', email)">
      <input
        v-model="email"
        type="email"
        placeholder="your@email.com"
        autocomplete="email"
        required
      />
      <button type="submit">Continue</button>
    </form>
    <button class="register-link" @click="emit('register')">No account? Create one</button>
  </div>
</template>

<style scoped>
.email-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.divider {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--color-border);
}

form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

input {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: var(--border-default);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  background-color: var(--color-surface);
  color: var(--color-text);
}

input:focus {
  outline: none;
  box-shadow: var(--shadow-focus);
}

button[type='submit'] {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: none;
  border-radius: var(--radius-md);
  background-color: var(--color-primary);
  color: var(--color-surface);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: background-color var(--transition-base);
}

button[type='submit']:hover {
  background-color: var(--color-primary-hover);
}

.register-link {
  align-self: center;
  padding: 0;
  border: none;
  background: none;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  cursor: pointer;
  text-decoration: underline;
}

.register-link:hover {
  color: var(--color-primary);
}
</style>
