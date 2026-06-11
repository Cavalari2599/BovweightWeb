<template>
  <div class="historial">

    <!-- Header -->
    <div class="header">
      <div class="header__titulo">
        <img src="../assets/cow-icon.png" alt="BovWeight" class="header__cow" />
        <h2>Historial de Acciones</h2>
      </div>
      <div class="header__acciones">
        <div class="buscador">
          <svg class="buscador__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            v-model="buscar"
            type="text"
            placeholder="Buscar historial..."
            @input="handleInput"
          />
        </div>
      </div>
    </div>

    <!-- Tabla -->
    <div class="tabla-container">

      <!-- Signos de pregunta al buscar -->
      <transition name="signo">
        <div v-if="buscando" class="signos-pregunta">
          <span style="animation-delay: 0s">?</span>
          <span style="animation-delay: 0.15s">?</span>
          <span style="animation-delay: 0.3s">?</span>
        </div>
      </transition>

      <!-- Vaca con ojos que siguen el cursor -->
      <svg
        ref="vacaRef"
        class="vaca-header"
        viewBox="0 0 100 85"
      >
        <ellipse cx="50" cy="48" rx="28" ry="18" fill="#f5f5f5" stroke="#333" stroke-width="0.5" />
        <path d="M 35 38 Q 40 32 48 36 Q 52 42 45 46 Q 38 44 35 38" fill="#2d2d2d" />
        <path d="M 55 40 Q 62 35 68 40 Q 70 48 63 50 Q 56 48 55 40" fill="#2d2d2d" />
        <path d="M 42 50 Q 48 48 52 52 Q 50 58 44 56 Q 40 54 42 50" fill="#2d2d2d" />
        <rect x="32" y="60" width="5" height="16" rx="2" fill="#f5f5f5" stroke="#333" stroke-width="0.3" />
        <rect x="40" y="60" width="5" height="16" rx="2" fill="#f5f5f5" stroke="#333" stroke-width="0.3" />
        <rect x="55" y="60" width="5" height="16" rx="2" fill="#f5f5f5" stroke="#333" stroke-width="0.3" />
        <rect x="63" y="60" width="5" height="16" rx="2" fill="#f5f5f5" stroke="#333" stroke-width="0.3" />
        <rect x="31" y="74" width="7" height="4" rx="2" fill="#5d4037" />
        <rect x="39" y="74" width="7" height="4" rx="2" fill="#5d4037" />
        <rect x="54" y="74" width="7" height="4" rx="2" fill="#5d4037" />
        <rect x="62" y="74" width="7" height="4" rx="2" fill="#5d4037" />
        <ellipse cx="48" cy="62" rx="6" ry="4" fill="#ffcdd2" />
        <path d="M 78 44 Q 88 40 86 48 Q 90 52 88 56" fill="none" stroke="#333" stroke-width="1.2" stroke-linecap="round" />
        <ellipse cx="88" cy="57" rx="2" ry="3" fill="#2d2d2d" />
        <g
          :style="{
            transform: `rotate(${headAngle}deg)`,
            transformOrigin: '28px 40px',
            transition: 'transform 0.12s ease-out'
          }"
        >
          <path d="M 25 42 Q 20 38 18 32 Q 22 28 28 30 L 30 42 Z" fill="#f5f5f5" stroke="#333" stroke-width="0.3" />
          <ellipse cx="16" cy="28" rx="12" ry="10" fill="#f5f5f5" stroke="#333" stroke-width="0.5" />
          <path d="M 10 22 Q 14 18 20 20 Q 22 26 18 28 Q 12 28 10 22" fill="#2d2d2d" />
          <ellipse cx="6" cy="20" rx="4" ry="2.5" fill="#ffcdd2" stroke="#333" stroke-width="0.3" transform="rotate(-30 6 20)" />
          <ellipse cx="26" cy="20" rx="4" ry="2.5" fill="#ffcdd2" stroke="#333" stroke-width="0.3" transform="rotate(30 26 20)" />
          <path d="M 10 18 Q 8 12 10 10" fill="none" stroke="#f5f5dc" stroke-width="2" stroke-linecap="round" />
          <path d="M 22 18 Q 24 12 22 10" fill="none" stroke="#f5f5dc" stroke-width="2" stroke-linecap="round" />
          <circle cx="11" cy="26" r="3" fill="white" stroke="#333" stroke-width="0.3" />
          <circle cx="21" cy="26" r="3" fill="white" stroke="#333" stroke-width="0.3" />
          <circle cx="11" cy="26" r="1.5" fill="#1a1a1a"
            :style="{ transform: `translate(${-eyeOffset.x}px, ${eyeOffset.y}px)`, transition: 'transform 0.08s ease-out' }" />
          <circle cx="21" cy="26" r="1.5" fill="#1a1a1a"
            :style="{ transform: `translate(${-eyeOffset.x}px, ${eyeOffset.y}px)`, transition: 'transform 0.08s ease-out' }" />
          <circle cx="10" cy="25" r="0.6" fill="white"
            :style="{ transform: `translate(${-eyeOffset.x * 0.5}px, ${eyeOffset.y * 0.5}px)` }" />
          <circle cx="20" cy="25" r="0.6" fill="white"
            :style="{ transform: `translate(${-eyeOffset.x * 0.5}px, ${eyeOffset.y * 0.5}px)` }" />
          <ellipse cx="16" cy="34" rx="6" ry="4" fill="#ffcdd2" stroke="#333" stroke-width="0.3" />
          <circle cx="14" cy="34" r="1" fill="#333" />
          <circle cx="18" cy="34" r="1" fill="#333" />
          <path d="M 13 37 Q 16 39 19 37" fill="none" stroke="#333" stroke-width="0.5" stroke-linecap="round" />
        </g>
      </svg>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <div class="th-content">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20v-1a8 8 0 0 1 16 0v1"/>
                </svg>
                Usuario
              </div>
            </th>
            <th>
              <div class="th-content">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
                Acción
              </div>
            </th>
            <th>
              <div class="th-content">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                </svg>
                Tabla
              </div>
            </th>
            <th>
              <div class="th-content">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Registro
              </div>
            </th>
            <th>
              <div class="th-content">
                <svg class="icon-calendario" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Fecha
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in historial"
            :key="item.id_historial"
            class="fila-historial"
            :style="{ animationDelay: `${i * 0.04}s` }"
          >
            <td class="td-id">{{ item.id_historial }}</td>

            <!-- Usuario -->
            <td class="td-usuario">
              <div class="usuario-wrap">
                <div class="avatar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20v-1a8 8 0 0 1 16 0v1"/>
                  </svg>
                </div>
                <span>{{ item.usuario?.nombre_usuario }} {{ item.usuario?.apellido1_usuario }}</span>
              </div>
            </td>

            <!-- Acción con badge de color -->
            <td class="td-accion">
              <span class="badge-accion" :class="badgeAccion(item.accion)">
                {{ item.accion }}
              </span>
            </td>

            <!-- Tabla -->
            <td class="td-tabla">
              <span class="tabla-tag">{{ item.tabla_afectada || '-' }}</span>
            </td>

            <!-- Registro -->
            <td class="td-registro">
              <span class="registro-val">{{ item.id_registro || '-' }}</span>
            </td>

            <!-- Fecha -->
            <td class="td-fecha">
              <div class="fecha-wrap">
                <svg class="fecha-icon" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>{{ formatFecha(item.fecha_accion) }}</span>
              </div>
            </td>
          </tr>

          <tr v-if="historial.length === 0">
            <td colspan="6" class="sin-resultados">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-border)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:36px;height:36px">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <p>No se encontraron registros.</p>
              <span>Intenta con otro término de búsqueda</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { historialService } from '../services/historial'

const historial  = ref([])
const buscar     = ref('')
const buscando   = ref(false)
const vacaRef    = ref(null)
const eyeOffset  = reactive({ x: 0, y: 0 })
const headAngle  = ref(0)
let buscandoTimeout = null

async function cargarHistorial() {
  const response = await historialService.getAll(buscar.value)
  historial.value = response.data
}

function handleInput() {
  cargarHistorial()
  buscando.value = true
  clearTimeout(buscandoTimeout)
  buscandoTimeout = setTimeout(() => {
    buscando.value = false
  }, 1500)
}

function formatFecha(fecha) {
  if (!fecha) return '-'
  return new Date(fecha).toLocaleString('es-CR')
}

// Badge de color según la acción
function badgeAccion(accion) {
  if (!accion) return 'badge-default'
  const a = accion.toLowerCase()
  if (a.includes('acceso') || a.includes('login'))    return 'badge-acceso'
  if (a.includes('activar') || a.includes('crear'))   return 'badge-activar'
  if (a.includes('desactivar') || a.includes('eliminar')) return 'badge-desactivar'
  if (a.includes('editar') || a.includes('actualizar')) return 'badge-editar'
  return 'badge-default'
}

function handleMouseMove(e) {
  const el = vacaRef.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  const cowCenterX = rect.left + rect.width  / 2
  const cowCenterY = rect.top  + rect.height / 3

  const dx       = e.clientX - cowCenterX
  const dy       = e.clientY - cowCenterY
  const distance = Math.sqrt(dx * dx + dy * dy)
  const maxOffset = 2.5

  eyeOffset.x = (dx / Math.max(distance, 1)) * maxOffset
  eyeOffset.y = (dy / Math.max(distance, 1)) * maxOffset

  const angle = Math.atan2(dy, -dx) * (180 / Math.PI)
  headAngle.value = Math.max(-18, Math.min(18, angle * 0.25))
}

onMounted(() => {
  cargarHistorial()
  window.addEventListener('mousemove', handleMouseMove)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  clearTimeout(buscandoTimeout)
})
</script>

<style scoped>
.historial {
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

/* ── Tabla container ── */
.tabla-container {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  overflow: visible;
  position: relative;
}

/* ── Vaca ── */
.vaca-header {
  position: absolute;
  top: -70px;
  right: 270px;
  width: 93px;
  height: auto;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
  z-index: 10;
  pointer-events: none;
  transform: scaleX(-1);
}

/* ── Signos de pregunta ── */
.signos-pregunta {
  position: absolute;
  top: -100px;
  right: 230px;
  display: flex;
  gap: 3px;
  pointer-events: none;
  z-index: 11;
}
.signos-pregunta span {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary);
  animation: flotar-signo 0.6s ease-in-out infinite alternate;
  display: inline-block;
  text-shadow: 0 1px 4px rgba(45, 106, 79, 0.3);
}
@keyframes flotar-signo {
  from { transform: translateY(0) rotate(-5deg); opacity: 0.7; }
  to   { transform: translateY(-6px) rotate(5deg); opacity: 1; }
}
.signo-enter-active { transition: all 0.25s ease; }
.signo-leave-active { transition: all 0.25s ease; }
.signo-enter-from   { opacity: 0; transform: translateY(8px); }
.signo-leave-to     { opacity: 0; transform: translateY(-8px); }

/* ── Tabla ── */
table {
  width: 100%;
  border-collapse: collapse;
  border-radius: var(--radius-lg);
  overflow: hidden;
}
thead { background: var(--color-primary-dark); }
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
.th-content {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.th-content svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  opacity: 0.8;
}

/* Animación calendario en el header */
.icon-calendario {
  animation: calendar-pulse 2.5s ease-in-out infinite;
}
@keyframes calendar-pulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.15); }
}

td {
  padding: 0.85rem 1.1rem;
  font-size: 0.875rem;
  color: var(--color-text);
  font-family: var(--font-ui);
  border-bottom: 1px solid var(--color-border);
  vertical-align: middle;
}
tbody tr:last-child td { border-bottom: none; }

.fila-historial {
  animation: fadeInUp 0.3s ease both;
  transition: background 0.15s;
}
.fila-historial:hover { background: var(--color-bg); }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Columnas ── */
.td-id {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  width: 50px;
}

.td-usuario .usuario-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.avatar {
  width: 30px;
  height: 30px;
  background: var(--color-primary-pale);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  flex-shrink: 0;
  border: 1.5px solid var(--color-primary-light);
}
.avatar svg { width: 100%; height: 100%; }

/* Badges de acción */
.badge-accion {
  display: inline-block;
  padding: 0.2rem 0.7rem;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--font-ui);
  white-space: nowrap;
}
.badge-acceso    { background: var(--color-blue-pale);   color: var(--color-blue); }
.badge-activar   { background: var(--color-primary-pale); color: var(--color-primary); }
.badge-desactivar{ background: var(--color-error-pale);  color: var(--color-error); }
.badge-editar    { background: var(--color-amber-pale);  color: var(--color-amber); }
.badge-default   { background: var(--color-gray-pale);   color: var(--color-gray); }

/* Tabla tag */
.tabla-tag {
  display: inline-block;
  padding: 0.15rem 0.55rem;
  background: var(--color-gray-pale);
  color: var(--color-text-muted);
  border-radius: var(--radius-sm);
  font-size: 0.78rem;
  font-family: var(--font-ui);
  border: 1px solid var(--color-border);
}

/* Registro */
.registro-val {
  font-family: var(--font-base);
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

/* Fecha */
.fecha-wrap {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-text-muted);
  font-size: 0.82rem;
}
.fecha-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

/* ── Sin resultados ── */
.sin-resultados {
  text-align: center;
  padding: 3.5rem;
  color: var(--color-text-muted);
  font-family: var(--font-ui);
}
.sin-resultados p {
  margin: 0.6rem 0 0.2rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}
.sin-resultados span { font-size: 0.82rem; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .historial { padding: 1.2rem; }
  .header { flex-direction: column; align-items: flex-start; }
  .header__acciones { width: 100%; }
  .buscador input { width: 100%; }
  .tabla-container { overflow-x: auto; }
  .vaca-header { display: none; }
  .signos-pregunta { display: none; }
}
</style>