<template>
  <div class="sidebar">

    <!-- Header con imagen -->
    <div class="sidebar-header">
      <div class="sidebar-header__overlay"></div>
      <div class="sidebar-header__content">
        <img src="../assets/cow-icon.png" alt="BovWeight" class="logo-cow" />
        <div>
          <h2>BovWeight CR</h2>
          <p class="logo-sub">Sistema de Pesaje de Ganado</p>
        </div>
      </div>
    </div>

    <!-- Nav -->
    <nav>
      <router-link to="/dashboard" class="nav-item">
        <span class="nav-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </span>
        <span class="nav-texto">
          <span class="nav-label">Dashboard</span>
          <span class="nav-desc">Panel de inicio</span>
        </span>
        <svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </router-link>

      <router-link to="/usuarios" class="nav-item">
        <span class="nav-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="7" r="3"/>
            <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            <path d="M21 21v-2a4 4 0 0 0-3-3.87"/>
          </svg>
        </span>
        <span class="nav-texto">
          <span class="nav-label">Usuarios</span>
          <span class="nav-desc">Gestión de usuarios</span>
        </span>
        <svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </router-link>

      <router-link to="/fincas" class="nav-item">
        <span class="nav-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </span>
        <span class="nav-texto">
          <span class="nav-label">Fincas</span>
          <span class="nav-desc">Fincas registradas</span>
        </span>
        <svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </router-link>

      <router-link to="/historial" class="nav-item">
        <span class="nav-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9"/>
            <polyline points="12 7 12 12 15 15"/>
            <path d="M3.05 11a9 9 0 1 0 .5-3"/>
            <polyline points="3 4 3 11 10 11"/>
          </svg>
        </span>
        <span class="nav-texto">
          <span class="nav-label">Historial</span>
          <span class="nav-desc">Historial de acciones</span>
        </span>
        <svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </router-link>
    </nav>


      <!-- Usuario expandible -->
      <div class="usuario-card" @click="expandido = !expandido">
        <div class="avatar-inicial">
          {{ auth.usuario?.nombre?.charAt(0).toUpperCase() }}
        </div>
        <div class="usuario-texto">
          <p class="nombre">{{ auth.usuario?.nombre }} {{ auth.usuario?.apellido1_usuario }}</p>
          <p class="rol">Técnico</p>
        </div>
        <svg
          class="expand-arrow"
          :class="{ 'expand-arrow--open': expandido }"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      <!-- Detalle expandido -->
      <div class="usuario-detalle" :class="{ 'usuario-detalle--visible': expandido }">
        <div class="detalle-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span>{{ auth.usuario?.correo }}</span>
        </div>
      </div>

      <button class="btn-logout" @click="handleLogout">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Cerrar sesión
      </button>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router   = useRouter()
const auth     = useAuthStore()
const expandido = ref(false)

async function handleLogout() {
  await auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  width: 265px;
  min-height: 100vh;
  background-color: var(--color-primary-dark);
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
}

/* ── Header con imagen ── */
.sidebar-header {
  position: relative;
  height: 110px;
  background-image: url('../assets/ganado.jpg');
  background-size: cover;
  background-position: center top;
  flex-shrink: 0;
}
.sidebar-header__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(27,67,50,0.55) 0%,
    rgba(27,67,50,0.85) 60%,
    rgba(27,67,50,1)    100%
  );
}
.sidebar-header__content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 1.2rem 1.2rem 0.8rem;
  height: 100%;
  align-items: flex-end;
}
.logo-cow {
  width: 36px;
  height: 36px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.92;
  flex-shrink: 0;
  margin-bottom: 2px;
}
.sidebar-header__content h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  font-family: var(--font-base);
  letter-spacing: -0.3px;
  line-height: 1.2;
}
.logo-sub {
  margin: 0;
  font-size: 0.68rem;
  color: var(--color-primary-light);
  font-family: var(--font-ui);
  margin-top: 1px;
}

/* ── Nav ── */
nav {
  flex: 1;
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.7rem 0.75rem;
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  border-radius: var(--radius-md);
  border-left: 3px solid transparent;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  position: relative;
}

.nav-icon-wrap {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: var(--radius-sm);
  background: rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.25s ease;
}
.nav-icon-wrap svg {
  width: 17px;
  height: 17px;
  transition: transform 0.25s ease;
}

.nav-texto {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
  min-width: 0;
}
.nav-label {
  font-size: 0.875rem;
  font-weight: 600;
  font-family: var(--font-ui);
  line-height: 1.2;
  transition: transform 0.2s ease;
}
.nav-desc {
  font-size: 0.68rem;
  color: rgba(255,255,255,0.4);
  font-family: var(--font-ui);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-arrow {
  width: 14px;
  height: 14px;
  opacity: 0.4;
  flex-shrink: 0;
  transition: opacity 0.2s, transform 0.2s;
}

/* Hover */
.nav-item:hover {
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.95);
}
.nav-item:hover .nav-icon-wrap {
  background: rgba(255,255,255,0.14);
  transform: scale(1.08);
}
.nav-item:hover .nav-label {
  transform: translateX(2px);
}
.nav-item:hover .nav-arrow {
  opacity: 0.8;
  transform: translateX(2px);
}
.nav-item:hover .nav-desc {
  color: rgba(255,255,255,0.55);
}

/* Activo */
.nav-item.router-link-active {
  background: rgba(255,255,255,0.13);
  color: #ffffff;
  border-left-color: var(--color-primary-light);
}
.nav-item.router-link-active .nav-icon-wrap {
  background: var(--color-primary);
  animation: icon-glow 2.5s ease-in-out infinite;
}
.nav-item.router-link-active .nav-label {
  font-weight: 700;
}
.nav-item.router-link-active .nav-desc {
  color: rgba(255,255,255,0.6);
}
.nav-item.router-link-active .nav-arrow {
  opacity: 1;
  color: var(--color-primary-light);
}
@keyframes icon-glow {
  0%, 100% { box-shadow: 0 0 0px rgba(82,183,136,0); }
  50%       { box-shadow: 0 0 8px rgba(82,183,136,0.5); }
}

/* ── Footer ── */
.sidebar-footer {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative;
}


/* Contenido footer */
.usuario-card {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1rem;
  cursor: pointer;
  border-radius: var(--radius-md);
  margin: 0 0.5rem;
  transition: background 0.2s;
}
.usuario-card:hover {
  background: rgba(255,255,255,0.06);
}

.avatar-inicial {
  width: 34px !important;
  height: 34px !important;
  min-width: 34px !important;
  border-radius: 50% !important;
  background: rgba(255,255,255,0.15) !important;
  border: 1.5px solid rgba(255,255,255,0.25) !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem !important;
  font-weight: 700;
  color: #ffffff !important;
  flex-shrink: 0;
  font-family: var(--font-base);
  padding: 0 !important;
  box-shadow: none !important;
  text-decoration: none !important;
}

.usuario-texto { flex: 1; min-width: 0; }
.nombre {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: var(--font-ui);
}
.rol {
  margin: 0;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.5);
  font-family: var(--font-ui);
}

.expand-arrow {
  width: 15px;
  height: 15px;
  color: rgba(255,255,255,0.5);
  flex-shrink: 0;
  transition: transform 0.3s ease;
}
.expand-arrow--open {
  transform: rotate(180deg);
}

/* Detalle expandido */
.usuario-detalle {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  margin: 0 0.5rem;
}
.usuario-detalle--visible {
  max-height: 80px;
  opacity: 1;
}
.detalle-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem 0.6rem;
  background: rgba(255,255,255,0.06);
  border-radius: var(--radius-sm);
}
.detalle-row svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
  color: var(--color-primary-light);
}
.detalle-row span {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.65);
  font-family: var(--font-ui);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Botón cerrar sesión */
.btn-logout {
  width: calc(100% - 1rem);
  margin: 0 0.5rem 0.75rem;
  padding: 0.55rem 1rem;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: var(--radius-md);
  color: rgba(255,255,255,0.7);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-ui);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.btn-logout svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}
.btn-logout:hover {
  background: rgba(230,57,70,0.15);
  border-color: rgba(230,57,70,0.5);
  color: #ff8a8a;
}
.btn-logout:hover svg {
  transform: translateX(3px);
}
</style>