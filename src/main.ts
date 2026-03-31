import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './index.css'
import App from './App.vue'

// GitHub Pages SPA: restore path from redirect query param
const redirectParam = new URLSearchParams(window.location.search).get('redirect')
if (redirectParam) {
    window.history.replaceState(null, '', redirectParam)
}

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).mount('#root')