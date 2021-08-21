import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/messages',
        name: 'Messages',
        component: () => import('../views/Messages.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/profil',
        name: 'Profil',
        component: () => import('../views/Profil.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router