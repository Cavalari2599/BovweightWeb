<template>
    <div class="sidebar">
        <div class="sidebar-logo">
            <h2>BovWeight CR</h2>
        </div>

<nav>
    <router-link to="/dashboard" class="nav-item">
        📊 Dashboard
    </router-link>
    <router-link to="/usuarios" class="nav-item">
        👥 Usuarios
    </router-link>
    <router-link to="/fincas" class="nav-item">
        🏡 Fincas
    </router-link>
    <router-link to="/historial" class="nav-item">
        📋 Historial
    </router-link>
</nav>

        <div class="sidebar-footer">
            <div class="usuario-info">
                <p class="nombre">{{ auth.usuario?.nombre }} {{ auth.usuario?.apellido }}</p>
                <p class="rol">{{ auth.usuario?.rol === 4 ? 'Técnico' : '' }}</p>
            </div>
            <button @click="handleLogout">Cerrar sesión</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

async function handleLogout() {
    await auth.logout()
    router.push('/login')
}
</script>

<style scoped>
.sidebar {
    width: 240px;
    min-height: 100vh;
    background-color: #1b4332;
    color: white;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
}

.sidebar-logo {
    padding: 1.5rem;
    border-bottom: 1px solid #2d6a4f;
}

.sidebar-logo h2 {
    margin: 0;
    font-size: 1.2rem;
    color: white;
}

nav {
    flex: 1;
    padding: 1rem 0;
}

.nav-item {
    display: block;
    padding: 0.85rem 1.5rem;
    color: #b7e4c7;
    text-decoration: none;
    font-size: 0.95rem;
    transition: background 0.2s;
}

.nav-item:hover {
    background-color: #2d6a4f;
    color: white;
}

.nav-item.router-link-active {
    background-color: #2d6a4f;
    color: white;
    font-weight: bold;
    border-left: 4px solid #74c69d;
}

.sidebar-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #2d6a4f;
}

.usuario-info {
    margin-bottom: 0.75rem;
}

.nombre {
    margin: 0;
    font-size: 0.9rem;
    font-weight: bold;
}

.rol {
    margin: 0;
    font-size: 0.8rem;
    color: #b7e4c7;
}

button {
    width: 100%;
    padding: 0.5rem;
    background-color: transparent;
    border: 1px solid #74c69d;
    color: #74c69d;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
}

button:hover {
    background-color: #2d6a4f;
    color: white;
}
</style>