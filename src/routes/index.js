import { createWebHistory, createRouter } from "vue-router";
import Todos from './../pages/Todos.vue'
const routes = [
    {
        path: '/',
        redirect: '/todos'
    },
    {
        path: '/todos',
        name: 'Todos',
        component: Todos,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router