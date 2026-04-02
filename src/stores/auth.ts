import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const loading = ref(true)

    async function initialize() {
        supabase.auth.onAuthStateChange((_event, session) => {
            user.value = session?.user ?? null
            loading.value = false
        })
        
        const { data } = await supabase.auth.getSession()
        if (loading.value && !window.location.hash.includes('access_token')) {
            user.value = data.session?.user ?? null
            loading.value = false
        }
    }

    async function signInWithOAuth(provider: 'google' | 'github') {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}` },
        })
        if (error) throw error
    }

    async function signIn(email: string, password: string) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
    }

    async function signUp(email: string, password: string) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
    }

    async function signOut() {
        await supabase.auth.signOut()
    }

    async function updateEmail(email: string) {
        const { error } = await supabase.auth.updateUser({ email })
        if (error) throw error
    }

    async function updatePassword(password: string) {
        const { error } = await supabase.auth.updateUser({ password })
        if (error) throw error
    }

    const isOAuthUser = computed(() =>
        user.value?.app_metadata?.provider !== 'email'
    )

    return { user, loading, isOAuthUser, initialize, signInWithOAuth, signIn, signUp, signOut, updateEmail, updatePassword }
})
