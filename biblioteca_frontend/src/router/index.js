import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useSessao } from '../composables/useSessao'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        {
            path: '/entrar',
            name: 'entrar',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/colecoes',
            name: 'colecoes',
            component: () => import('../views/ColecoesView.vue'),
            meta: { requerLogin: true },
        },
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
    scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
    const { logado } = useSessao()

    if (to.meta.requerLogin && !logado.value) {
        return { name: 'entrar', query: { redirect: to.fullPath } }
    }
})

export default router