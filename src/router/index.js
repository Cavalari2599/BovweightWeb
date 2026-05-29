import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import Login from '../views/Login.vue'
<<<<<<< HEAD
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
=======
>>>>>>> 601e5ddceeceba2beb40b4435a08c7e2a800d40a
import Dashboard from '../views/Dashboard.vue'
import Usuarios from '../views/Usuarios.vue'
import UsuarioForm from '../views/UsuarioForm.vue'
import Historial from '../views/Historial.vue'
import Inicio from '../views/Inicio.vue'
import Fincas from '../views/Fincas.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: Login, meta: { guest: true } },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
        children: [
            { path: '', name: 'Dashboard', component: Inicio },
            { path: '/usuarios', name: 'Usuarios', component: Usuarios, meta: { soloTecnico: true } },
            { path: '/usuarios/crear', name: 'UsuarioCrear', component: UsuarioForm, meta: { soloTecnico: true } },
            { path: '/usuarios/editar/:id', name: 'UsuarioEditar', component: UsuarioForm, meta: { soloTecnico: true } },
            { path: '/historial', name: 'Historial', component: Historial, meta: { soloTecnico: true } },
            { path: '/fincas', name: 'Fincas', component: Fincas, meta: { soloTecnico: true } },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return '/login'
    }

    if (to.meta.guest && auth.isAuthenticated) {
        return '/dashboard'
    }

    if (to.meta.soloTecnico && auth.usuario?.rol !== 4) {
        return '/dashboard'
    }
})

export default router