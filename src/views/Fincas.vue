<template>
  <div class="fincas">

    <!-- Header -->
    <div class="header">
      <div class="header__titulo">
        <img src="../assets/cow-icon.png" alt="BovWeight" class="header__cow" />
        <h2>Fincas Registradas</h2>
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
            placeholder="Buscar finca..."
            @input="handleInput"
          />
        </div>
      </div>
    </div>

    <!-- Tabla -->
    <div class="tabla-container">

      <!-- Signos de pregunta -->
      <transition name="signo">
        <div v-if="buscando" class="signos-pregunta">
          <span style="animation-delay: 0s">?</span>
          <span style="animation-delay: 0.15s">?</span>
          <span style="animation-delay: 0.3s">?</span>
        </div>
      </transition>

      <!-- Vaca -->
      <svg
        ref="vacaRef"
        class="vaca-header"
        viewBox="0 0 100 85"
      >
        <!-- Cuerpo -->
        <ellipse cx="50" cy="48" rx="28" ry="18" fill="#f5f5f5" stroke="#333" stroke-width="0.5" />
        <path d="M 35 38 Q 40 32 48 36 Q 52 42 45 46 Q 38 44 35 38" fill="#2d2d2d" />
        <path d="M 55 40 Q 62 35 68 40 Q 70 48 63 50 Q 56 48 55 40" fill="#2d2d2d" />
        <path d="M 42 50 Q 48 48 52 52 Q 50 58 44 56 Q 40 54 42 50" fill="#2d2d2d" />
        <!-- Patas -->
        <rect x="32" y="60" width="5" height="16" rx="2" fill="#f5f5f5" stroke="#333" stroke-width="0.3" />
        <rect x="40" y="60" width="5" height="16" rx="2" fill="#f5f5f5" stroke="#333" stroke-width="0.3" />
        <rect x="55" y="60" width="5" height="16" rx="2" fill="#f5f5f5" stroke="#333" stroke-width="0.3" />
        <rect x="63" y="60" width="5" height="16" rx="2" fill="#f5f5f5" stroke="#333" stroke-width="0.3" />
        <!-- Pezuñas -->
        <rect x="31" y="74" width="7" height="4" rx="2" fill="#5d4037" />
        <rect x="39" y="74" width="7" height="4" rx="2" fill="#5d4037" />
        <rect x="54" y="74" width="7" height="4" rx="2" fill="#5d4037" />
        <rect x="62" y="74" width="7" height="4" rx="2" fill="#5d4037" />
        <!-- Ubre -->
        <ellipse cx="48" cy="62" rx="6" ry="4" fill="#ffcdd2" />
        <!-- Cola -->
        <path d="M 78 44 Q 88 40 86 48 Q 90 52 88 56" fill="none" stroke="#333" stroke-width="1.2" stroke-linecap="round" />
        <ellipse cx="88" cy="57" rx="2" ry="3" fill="#2d2d2d" />

        <!-- Cabeza -->
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
          <!-- Ojos blancos -->
          <circle cx="11" cy="26" r="3" fill="white" stroke="#333" stroke-width="0.3" />
          <circle cx="21" cy="26" r="3" fill="white" stroke="#333" stroke-width="0.3" />
          <!-- Pupilas reactivas — negamos x porque está con scaleX(-1) -->
          <circle cx="11" cy="26" r="1.5" fill="#1a1a1a"
            :style="{ transform: `translate(${-eyeOffset.x}px, ${eyeOffset.y}px)`, transition: 'transform 0.08s ease-out' }" />
          <circle cx="21" cy="26" r="1.5" fill="#1a1a1a"
            :style="{ transform: `translate(${-eyeOffset.x}px, ${eyeOffset.y}px)`, transition: 'transform 0.08s ease-out' }" />
          <!-- Brillos -->
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
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Propietario</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(finca, i) in fincas"
            :key="finca.id_finca"
            class="fila-finca"
            :style="{ animationDelay: `${i * 0.05}s` }"
          >
            <td class="td-id">{{ finca.id_finca }}</td>

            <td class="td-nombre">
              <div class="finca-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <span class="finca-nombre">{{ finca.nombre_finca }}</span>
            </td>

            <td class="td-ubicacion">
              <div class="ubicacion-wrap">
                <svg class="ubicacion-icon" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{{ finca.ubicacion_finca }}</span>
              </div>
            </td>

            <td class="td-propietario">
              <div class="propietario-wrap">
                <div class="avatar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20v-1a8 8 0 0 1 16 0v1"/>
                  </svg>
                </div>
                <span>{{ finca.usuario?.nombre_usuario }} {{ finca.usuario?.apellido1_usuario }}</span>
              </div>
            </td>

            <td class="td-correo">
              <div class="correo-wrap">
                <svg class="correo-icon" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>{{ finca.usuario?.correo }}</span>
              </div>
            </td>
          </tr>

          <tr v-if="fincas.length === 0">
            <td colspan="5" class="sin-resultados">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-border)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:36px;height:36px">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <p>No se encontraron fincas.</p>
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
import { fincasService } from '../services/fincas'

const fincas   = ref([])
const buscar   = ref('')
const buscando = ref(false)
const vacaRef  = ref(null)
const eyeOffset = reactive({ x: 0, y: 0 })
const headAngle = ref(0)
let buscandoTimeout = null

async function cargarFincas() {
  const response = await fincasService.getAll(buscar.value)
  fincas.value = response.data
}

function handleInput() {
  cargarFincas()
  buscando.value = true
  clearTimeout(buscandoTimeout)
  buscandoTimeout = setTimeout(() => {
    buscando.value = false
  }, 1500)
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

  // La vaca tiene scaleX(-1) en CSS así que negamos x
  eyeOffset.x = (dx / Math.max(distance, 1)) * maxOffset
  eyeOffset.y = (dy / Math.max(distance, 1)) * maxOffset

  const angle = Math.atan2(dy, -dx) * (180 / Math.PI)
  headAngle.value = Math.max(-18, Math.min(18, angle * 0.25))
}

onMounted(() => {
  cargarFincas()
  window.addEventListener('mousemove', handleMouseMove)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  clearTimeout(buscandoTimeout)
})
</script>

<style scoped>
.fincas {
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

/* Transición entrada/salida signos */
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
td {
  padding: 0.9rem 1.1rem;
  font-size: 0.875rem;
  color: var(--color-text);
  font-family: var(--font-ui);
  border-bottom: 1px solid var(--color-border);
  vertical-align: middle;
}
tbody tr:last-child td { border-bottom: none; }

.fila-finca {
  animation: fadeInUp 0.3s ease both;
  transition: background 0.15s;
}
.fila-finca:hover { background: var(--color-bg); }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Columnas ── */
.td-id {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  width: 50px;
}
.td-nombre {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.finca-icon-wrap {
  width: 32px;
  height: 32px;
  background: var(--color-primary-pale);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}
.fila-finca:hover .finca-icon-wrap {
  transform: scale(1.1) rotate(-3deg);
}
.finca-icon-wrap svg { width: 100%; height: 100%; }
.finca-nombre {
  font-weight: 600;
  color: var(--color-primary-dark);
}

.ubicacion-wrap {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.ubicacion-icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  animation: pin-bounce 2s ease-in-out infinite;
}
@keyframes pin-bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-3px); }
}

.propietario-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
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
  border: 1.5px solid var(--color-primary-light);
}
.avatar svg { width: 100%; height: 100%; }

.td-correo { color: var(--color-text-muted); }
.correo-wrap {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.correo-icon {
  width: 14px;
  height: 14px;
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
  .fincas { padding: 1.2rem; }
  .header { flex-direction: column; align-items: flex-start; }
  .header__acciones { width: 100%; }
  .buscador input { width: 100%; }
  .tabla-container { overflow-x: auto; }
  .vaca-header { display: none; }
  .signos-pregunta { display: none; }
}
</style>