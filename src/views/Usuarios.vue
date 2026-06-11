<template>
  <div class="usuarios">

    <!-- Header -->
    <div class="header">
      <div class="header__titulo">
        <img src="../assets/cow-icon.png" alt="BovWeight" class="header__cow" />
        <h2>Gestión de Usuarios</h2>
      </div>
      <div class="header__acciones">
        <!-- Buscador -->
        <div class="buscador">
          <svg class="buscador__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            v-model="buscar"
            type="text"
            placeholder="Buscar usuario..."
            @input="buscarUsuarios"
          />
        </div>
        <!-- Botón nuevo -->
        <button class="btn-crear" @click="irACrear">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nuevo Usuario
        </button>
      </div>
    </div>

    <!-- Tabla -->
    <div class="tabla-container">
      <table>
        <thead>
          <tr>
            <th>Identificación</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.identificacion_usuario">

            <td class="td-id">{{ usuario.identificacion_usuario }}</td>

            <td class="td-nombre">
              <!-- Ícono persona -->
              <div class="avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20v-1a8 8 0 0 1 16 0v1"/>
                </svg>
              </div>
              <span>{{ usuario.nombre_usuario }} {{ usuario.apellido1_usuario }} {{ usuario.apellido2_usuario }}</span>
            </td>

            <td class="td-correo">{{ usuario.correo }}</td>

            <td class="td-rol">
              <span class="badge-rol">{{ usuario.rol?.nombre_rol }}</span>
            </td>

            <td class="td-estado">
              <div class="estado-wrap">
                <span
                  class="estado-dot"
                  :class="usuario.estado ? 'dot-activo' : 'dot-inactivo'"
                ></span>
                <span :class="usuario.estado ? 'estado-activo' : 'estado-inactivo'">
                  {{ usuario.estado ? 'Activo' : 'Inactivo' }}
                </span>
              </div>
            </td>

            <td class="td-acciones">
              <!-- Editar -->
              <button class="btn-accion btn-editar" @click="irAEditar(usuario.identificacion_usuario)" title="Editar usuario">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Editar
              </button>
              <!-- Activar/Desactivar -->
              <button
                class="btn-accion"
                :class="usuario.estado ? 'btn-desactivar' : 'btn-activar'"
                @click="cambiarEstado(usuario)"
                :title="usuario.estado ? 'Desactivar usuario' : 'Activar usuario'"
              >
                <!-- Ícono desactivar -->
                <svg v-if="usuario.estado" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                </svg>
                <!-- Ícono activar -->
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                {{ usuario.estado ? 'Desactivar' : 'Activar' }}
              </button>
            </td>

          </tr>
          <tr v-if="usuarios.length === 0">
            <td colspan="6" class="sin-resultados">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-border)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:32px;height:32px;margin-bottom:0.5rem">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p>No se encontraron usuarios.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usuariosService } from '../services/usuarios'

const router   = useRouter()
const usuarios = ref([])
const buscar   = ref('')

async function cargarUsuarios() {
  const response = await usuariosService.getAll(buscar.value)
  usuarios.value = response.data
}

async function buscarUsuarios() {
  await cargarUsuarios()
}

async function cambiarEstado(usuario) {
  const accion = usuario.estado ? 'desactivar' : 'activar'
  if (!confirm(`¿Deseas ${accion} a ${usuario.nombre_usuario}?`)) return
  await usuariosService.toggleEstado(usuario.identificacion_usuario)
  await cargarUsuarios()
}

function irACrear() {
  router.push('/usuarios/crear')
}

function irAEditar(id) {
  router.push(`/usuarios/editar/${id}`)
}

onMounted(cargarUsuarios)
</script>

<style scoped>
.usuarios {
  padding: 2rem 2.5rem;
  font-family: var(--font-ui);
}

/* ── Header ── */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.8rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.header__titulo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.header__cow {
  width: 38px;
  height: 38px;
  object-fit: contain;
  filter: invert(25%) sepia(50%) saturate(600%) hue-rotate(112deg) brightness(75%) contrast(95%);
}
.header__titulo h2 {
  margin: 0;
  font-family: var(--font-base);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  letter-spacing: -0.4px;
}
.header__acciones {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* ── Buscador ── */
.buscador {
  position: relative;
  display: flex;
  align-items: center;
}
.buscador__icon {
  position: absolute;
  left: 0.75rem;
  width: 15px;
  height: 15px;
  color: var(--color-text-muted);
  pointer-events: none;
}
.buscador input {
  padding: 0.5rem 0.9rem 0.5rem 2.2rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  width: 240px;
  background: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-ui);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.buscador input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-pale);
}
.buscador input::placeholder { color: var(--color-text-muted); }

/* ── Botón crear ── */
.btn-crear {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-ui);
  transition: background 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}
.btn-crear svg { width: 15px; height: 15px; }
.btn-crear:hover {
  background: var(--color-primary-dark);
  box-shadow: var(--shadow-sm);
}

/* ── Tabla ── */
.tabla-container {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  overflow: hidden;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead {
  background: var(--color-primary-dark);
}
th {
  padding: 0.85rem 1.1rem;
  text-align: left;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--font-ui);
}
td {
  padding: 0.85rem 1.1rem;
  font-size: 0.875rem;
  color: var(--color-text);
  font-family: var(--font-ui);
  border-bottom: 1px solid var(--color-border);
}
tbody tr:last-child td { border-bottom: none; }
tbody tr {
  transition: background 0.15s;
}
tbody tr:hover { background: var(--color-bg); }

/* ── Columnas específicas ── */
.td-id {
  color: var(--color-text-muted);
  font-size: 0.82rem;
  font-family: var(--font-ui);
}
.td-nombre {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 500;
}
.avatar {
  width: 32px;
  height: 32px;
  background: var(--color-primary-pale);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  flex-shrink: 0;
}
.avatar svg { width: 100%; height: 100%; }

.td-correo {
  color: var(--color-text-muted);
  font-size: 0.82rem;
}

/* Badge rol */
.badge-rol {
  display: inline-block;
  padding: 0.2rem 0.7rem;
  background: var(--color-primary-pale);
  color: var(--color-primary-dark);
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--font-ui);
}

/* Estado con punto animado */
.estado-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.estado-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot-activo {
  background: var(--color-primary);
  box-shadow: 0 0 0 0 var(--color-primary);
  animation: pulso-verde 2s ease-in-out infinite;
}
.dot-inactivo {
  background: var(--color-error);
  box-shadow: 0 0 0 0 var(--color-error);
  animation: pulso-rojo 2s ease-in-out infinite;
}
@keyframes pulso-verde {
  0%   { box-shadow: 0 0 0 0 rgba(45, 106, 79, 0.5); }
  50%  { box-shadow: 0 0 0 5px rgba(45, 106, 79, 0); }
  100% { box-shadow: 0 0 0 0 rgba(45, 106, 79, 0); }
}
@keyframes pulso-rojo {
  0%   { box-shadow: 0 0 0 0 rgba(230, 57, 70, 0.5); }
  50%  { box-shadow: 0 0 0 5px rgba(230, 57, 70, 0); }
  100% { box-shadow: 0 0 0 0 rgba(230, 57, 70, 0); }
}
.estado-activo  { color: var(--color-text); font-size: 0.82rem; }
.estado-inactivo { color: var(--color-text); font-size: 0.82rem; }

/* ── Botones acciones ── */
.td-acciones {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.btn-accion {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.38rem 0.8rem;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-ui);
  transition: opacity 0.2s, transform 0.1s;
  white-space: nowrap;
}
.btn-accion svg { width: 13px; height: 13px; flex-shrink: 0; }
.btn-accion:hover { opacity: 0.85; transform: translateY(-1px); }
.btn-accion:active { transform: translateY(0); }

.btn-editar {
  background: var(--color-blue-pale);
  color: var(--color-blue);
}
.btn-desactivar {
  background: var(--color-error-pale);
  color: var(--color-error);
}
.btn-activar {
  background: var(--color-primary-pale);
  color: var(--color-primary);
}

/* ── Sin resultados ── */
.sin-resultados {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-muted);
  font-family: var(--font-ui);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}
.sin-resultados p { margin: 0; font-size: 0.9rem; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .usuarios { padding: 1.2rem; }
  .header { flex-direction: column; align-items: flex-start; }
  .header__acciones { width: 100%; }
  .buscador input { width: 100%; }
  .tabla-container { overflow-x: auto; }
}
</style>