import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const loading = ref(true)

    async function initialize() {
        // Handle OAuth PKCE callback
        if (window.location.pathname.endsWith('/oauth/consent')) {
            const code = new URLSearchParams(window.location.search).get('code')
            if (code) {
                await supabase.auth.exchangeCodeForSession(code)
                window.history.replaceState({}, '', import.meta.env.BASE_URL)
            }
        }

        const { data } = await supabase.auth.getSession()
        user.value = data.session?.user ?? null
        loading.value = false

        supabase.auth.onAuthStateChange((_event, session) => {
            user.value = session?.user ?? null
        })
    }

    async function signInWithOAuth(provider: 'google' | 'github') {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}oauth/consent` },
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

    return { user, loading, initialize, signInWithOAuth, signIn, signUp, signOut }
})
