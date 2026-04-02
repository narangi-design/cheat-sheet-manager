<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
    router.push('/')
}
</script>

<template>
    <div class="privacy-page">
        <header class="privacy-header">
            <button class="back-button" @click="goBack">← Back</button>
            <h1 class="privacy-title">Privacy Policy</h1>
        </header>

        <main class="privacy-content">
            <p class="last-updated">Last updated: April 2026</p>

            <p>
                <strong>Cheat Sheet Manager</strong> (also known as Criblet) is a personal pet project
                built for learning purposes. It is not a commercial product.
            </p>

            <h2>What data we collect</h2>
            <p>When you create an account, we collect:</p>
            <ul>
                <li>Your <strong>email address</strong> (if you sign up with email and password)</li>
                <li>Your <strong>name and profile picture</strong> (if you sign in via Google or GitHub OAuth)</li>
                <li>The <strong>content of your notes and cheat sheets</strong> that you create in the app</li>
            </ul>
            <p>We do not collect analytics, track your behavior, or use advertising cookies.</p>

            <h2>Why we collect it</h2>
            <p>
                Your email or OAuth identity is used solely to authenticate you and associate your
                notes with your account. We have no other use for your personal data.
            </p>

            <h2>Third-party services</h2>
            <p>This app relies on the following external services:</p>
            <ul>
                <li>
                    <strong>Supabase</strong> — handles authentication and stores your data in a
                    PostgreSQL database. Data is hosted on AWS infrastructure (us-east-1 region by
                    default). See <a href="https://supabase.com/privacy" target="_blank" rel="noopener">Supabase Privacy Policy</a>.
                </li>
                <li>
                    <strong>GitHub Pages</strong> — hosts the static frontend of this application.
                    No user data is processed by GitHub Pages.
                </li>
                <li>
                    <strong>Google OAuth / GitHub OAuth</strong> — used optionally for sign-in. If you
                    choose this method, the respective provider shares your basic profile info (name,
                    email, avatar) with the app.
                </li>
            </ul>

            <h2>Cookies and local storage</h2>
            <p>
                This app uses browser <strong>localStorage</strong> to store your authentication
                session token. This is technically necessary for the app to function. No third-party
                tracking cookies are used.
            </p>

            <h2>Contact</h2>
            <p>
                If you have any questions, feel free to reach out via
                <a href="https://github.com" target="_blank" rel="noopener">GitHub Issues</a>.
            </p>
        </main>
    </div>
</template>

<style scoped>
.privacy-page {
    max-width: 720px;
    margin: 0 auto;
    padding-bottom: var(--space-lg);
}

.privacy-header {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding-bottom: var(--space-md);
}

.privacy-title {
    font-size: var(--font-size-xl);
}

.back-button {
    font-size: var(--font-size-sm);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-md);
}

.last-updated {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    margin-bottom: var(--space-md);
}

.privacy-content h2 {
    margin-top: var(--space-lg);
    margin-bottom: var(--space-xs);
    font-size: var(--font-size-md, 1rem);
}

.privacy-content p,
.privacy-content ul {
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-bottom: var(--space-sm);
}

.privacy-content ul {
    padding-left: var(--space-md);
}

.privacy-content li {
    margin-bottom: var(--space-xs);
}

.privacy-content a {
    color: var(--color-text);
    text-decoration: underline;
}
</style>
