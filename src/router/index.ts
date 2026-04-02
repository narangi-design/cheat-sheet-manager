import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import PrivacyPage from '../views/PrivacyPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: HomePage },
        { path: '/privacy', component: PrivacyPage },
    ],
})

export default router
