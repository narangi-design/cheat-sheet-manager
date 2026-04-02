<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'
import { useAuthStore } from '../../stores/auth'

const emit = defineEmits<{
  close: []
}>()

const auth = useAuthStore()

const newEmail = ref('')
const emailLoading = ref(false)
const emailMessage = ref('')
const emailError = ref('')

const newPassword = ref('')
const showPassword = ref(false)
const passwordLoading = ref(false)
const passwordMessage = ref('')
const passwordError = ref('')

async function handleUpdateEmail() {
  emailLoading.value = true
  emailError.value = ''
  emailMessage.value = ''
  try {
    await auth.updateEmail(newEmail.value)
    emailMessage.value = 'Confirmation sent to new email. Click the link to confirm.'
    newEmail.value = ''
  } catch (e) {
    emailError.value = (e as Error).message
  } finally {
    emailLoading.value = false
  }
}

async function handleUpdatePassword() {
  passwordLoading.value = true
  passwordError.value = ''
  passwordMessage.value = ''
  try {
    await auth.updatePassword(newPassword.value)
    passwordMessage.value = 'Password updated.'
    newPassword.value = ''
  } catch (e) {
    passwordError.value = (e as Error).message
  } finally {
    passwordLoading.value = false
  }
}
</script>

<template>
  <BaseModal title="Account" @close="emit('close')">
    <div class="current-email">
      <span class="label">Current email</span>
      <span>{{ auth.user?.email }}</span>
    </div>

    <hr class="divider" />

    <section>
      <h3 class="section-title">Change email</h3>
      <form @submit.prevent="handleUpdateEmail">
        <input
          v-model="newEmail"
          type="email"
          placeholder="New email"
          autocomplete="email"
          required
        />
        <button type="submit" :disabled="emailLoading">
          {{ emailLoading ? 'Sending…' : 'Send confirmation' }}
        </button>
      </form>
      <p v-if="emailMessage" class="message">{{ emailMessage }}</p>
      <p v-if="emailError" class="error">{{ emailError }}</p>
    </section>

    <template v-if="!auth.isOAuthUser">
      <hr class="divider" />
      <section>
        <h3 class="section-title">Change password</h3>
        <form @submit.prevent="handleUpdatePassword">
          <div class="password-field">
            <input
              v-model="newPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="New password"
              autocomplete="new-password"
              required
            />
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <button type="submit" :disabled="passwordLoading">
            {{ passwordLoading ? 'Saving…' : 'Update password' }}
          </button>
        </form>
        <p v-if="passwordMessage" class="message">{{ passwordMessage }}</p>
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
      </section>
    </template>
  </BaseModal>
</template>

<style scoped>
.current-email {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.divider {
  border: none;
  border-top: var(--border-default);
  margin: 0;
}

.section-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  margin-bottom: var(--space-sm);
}

form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

button[type='submit'] {
  width: 100%;
}

.message {
  font-size: var(--font-size-sm);
  color: var(--color-accent);
  margin-top: var(--space-xs);
}

</style>
