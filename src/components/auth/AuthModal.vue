<script setup lang="ts">
import { ref } from 'vue'
import OAuthButton from './OAuthButton.vue'
import BaseModal from './BaseModal.vue'
import { useAuthStore } from '../../stores/auth'

const emit = defineEmits<{
  close: []
}>()

type Mode = 'signin' | 'register'

const auth = useAuthStore()
const mode = ref<Mode>('signin')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

function switchMode(newMode: Mode) {
  mode.value = newMode
  error.value = ''
}

async function handleSubmit() {
  loading.value = true
  error.value = ''
  try {
    if (mode.value === 'signin') {
      await auth.signIn(email.value, password.value)
    } else {
      await auth.signUp(email.value, password.value)
    }
    emit('close')
  } catch (e) {
    error.value = (e as Error).message
  } finally {
    loading.value = false
  }
}

async function handleOAuth(provider: 'google' | 'github') {
  try {
    await auth.signInWithOAuth(provider)
  } catch (e) {
    error.value = (e as Error).message
  }
}
</script>

<template>
  <BaseModal :title="mode === 'signin' ? 'Log in' : 'Sign up'" @close="emit('close')">
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label for="auth-email">Email</label>
        <input
          id="auth-email"
          v-model="email"
          type="email"
          autocomplete="email"
          required
        />
      </div>

      <div class="field">
        <div class="field-header">
          <label for="auth-password">Password</label>
          <button
            v-if="mode === 'signin'"
            type="button"
            class="forgot"
            @click="() => {}"
          >Forgot password?</button>
        </div>
        <div class="password-field">
          <input
            id="auth-password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            required
          />
          <button type="button" class="toggle-password" @click="showPassword = !showPassword">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <div class="form-footer">
        <button type="submit" class="submit" :disabled="loading">
          {{ loading ? '…' : mode === 'signin' ? 'Log in' : 'Sign up' }}
        </button>
        <span class="switch">
          <template v-if="mode === 'signin'">
            New user? <button type="button" class="link" @click="switchMode('register')">Sign up</button>
          </template>
          <template v-else>
            Have an account? <button type="button" class="link" @click="switchMode('signin')">Log in</button>
          </template>
        </span>
      </div>
    </form>

    <div class="divider"><span>or continue with</span></div>

    <OAuthButton provider="google" @click="handleOAuth('google')" />
  </BaseModal>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.field-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.forgot {
  padding: 0;
  border: none;
  background: none;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  cursor: pointer;
  text-decoration: underline;
}

.forgot:hover {
  color: var(--color-primary);
}

.form-footer {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.submit {
  flex: 0 0 50%;
}

.switch {
  flex: 1;
  text-align: left;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.link {
  padding: 0;
  border: none;
  background: none;
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  cursor: pointer;
  text-decoration: underline;
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
</style>
