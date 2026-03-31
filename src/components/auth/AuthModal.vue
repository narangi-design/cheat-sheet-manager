<script setup lang="ts">
import { ref } from 'vue'
import EmailForm from './EmailForm.vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import { useAuthStore } from '../../stores/auth'

const emit = defineEmits<{
  close: []
}>()

type Step = 'email' | 'login' | 'register'

const auth = useAuthStore()
const step = ref<Step>('email')
const email = ref('')
const error = ref('')
const loading = ref(false)

function handleEmailSubmit(submittedEmail: string) {
  email.value = submittedEmail
  error.value = ''
  step.value = 'login'
}

async function handleOAuth(provider: 'google' | 'github') {
  try {
    await auth.signInWithOAuth(provider)
    // редирект происходит автоматически
  } catch (e) {
    error.value = (e as Error).message
  }
}

async function handleLogin(password: string) {
  loading.value = true
  error.value = ''
  try {
    await auth.signIn(email.value, password)
    emit('close')
  } catch (e) {
    const message = (e as Error).message
    if (message.includes('Invalid login credentials')) {
      error.value = 'Wrong password. No account yet?'
    } else {
      error.value = message
    }
  } finally {
    loading.value = false
  }
}

async function handleRegister(password: string) {
  loading.value = true
  error.value = ''
  try {
    await auth.signUp(email.value, password)
    emit('close')
  } catch (e) {
    error.value = (e as Error).message
  } finally {
    loading.value = false
  }
}

function goBack() {
  step.value = 'email'
  error.value = ''
}

function switchToRegister() {
  error.value = ''
  step.value = 'register'
}
</script>

<template>
  <div :class="$style.overlay" @click.self="emit('close')">
    <div :class="$style.modal">
      <EmailForm
        v-if="step === 'email'"
        @submit="handleEmailSubmit"
        @oauth="handleOAuth"
      />
      <LoginForm
        v-else-if="step === 'login'"
        :email="email"
        :loading="loading"
        @submit="handleLogin"
        @back="goBack"
        @forgot-password="() => {}"
      />
      <RegisterForm
        v-else-if="step === 'register'"
        :email="email"
        :loading="loading"
        @submit="handleRegister"
        @back="goBack"
      />

      <div v-if="error" class="error">
        {{ error }}
        <button v-if="step === 'login'" class="switch-link" @click="switchToRegister">
          Create account instead
        </button>
      </div>
    </div>
  </div>
</template>

<style module>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(79, 84, 88, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background-color: var(--color-surface);
  border: var(--border-default);
  padding: var(--space-xl);
  width: 100%;
  max-width: 400px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>

<style scoped>
.error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  background-color: #fef2f2;
  color: #b91c1c;
  font-size: var(--font-size-sm);
}

.switch-link {
  padding: 0;
  border: none;
  background: none;
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  text-decoration: underline;
  cursor: pointer;
  white-space: nowrap;
}
</style>
