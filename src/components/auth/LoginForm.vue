<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  email: string
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [password: string]
  back: []
  forgotPassword: []
}>()

const password = ref('')
const showPassword = ref(false)
</script>

<template>
  <div class="login-form">
    <button class="back" @click="emit('back')">← Back</button>
    <h2 class="title">Welcome back</h2>
    <p class="email">{{ email }}</p>

    <form @submit.prevent="emit('submit', password)">
      <div class="password-field">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
        <button type="button" class="toggle-password" @click="showPassword = !showPassword">
          {{ showPassword ? 'Hide' : 'Show' }}
        </button>
      </div>
      <button type="submit" :disabled="loading">{{ loading ? 'Signing in…' : 'Sign in' }}</button>
    </form>

    <button class="forgot" @click="emit('forgotPassword')">Forgot password?</button>
  </div>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.back {
  align-self: flex-start;
  padding: 0;
  border: none;
  background: none;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  cursor: pointer;
}

.back:hover {
  color: var(--color-primary);
}

.title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.email {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-top: calc(-1 * var(--space-sm));
}

form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.password-field {
  position: relative;
}

input {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  padding-right: 4rem;
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

.toggle-password {
  position: absolute;
  right: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  border: none;
  background: none;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  cursor: pointer;
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

.forgot {
  align-self: flex-start;
  padding: 0;
  border: none;
  background: none;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  cursor: pointer;
  text-decoration: underline;
}

.forgot:hover {
  color: var(--color-primary);
}
</style>
