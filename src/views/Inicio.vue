<template>
  <div class="inicio">

    <!-- Bienvenida -->
    <div class="bienvenida">
      <div class="bienvenida__texto">
        <h2>Panel de Control</h2>
        <p class="header-sub">
          Bienvenido/a, <strong>{{ auth.usuario?.nombre }}</strong> —
          {{ fechaHoy }}
        </p>
      </div>
      <img src="../assets/cow-icon.png" alt="BovWeight CR" class="bienvenida__cow" />
    </div>

    <!-- Loading -->
    <div v-if="loading" class="cargando">
      <img src="../assets/cow-icon.png" alt="cargando" class="cargando-icon" />
      <p>Cargando estadísticas...</p>
    </div>

    <div v-else class="dashboard-grid">

      <!-- ── Fila 1: KPIs principales ── -->
      <div class="kpi-row">

        <div class="kpi-card"
          @mouseenter="hoveredCard = 'usuarios'"
          @mouseleave="hoveredCard = null"
          :class="{ 'card-hovered': hoveredCard === 'usuarios' }">
          <div class="kpi-card__icon" style="background: var(--color-primary-pale)">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="7" r="3"/>
              <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              <path d="M21 21v-2a4 4 0 0 0-3-3.87"/>
            </svg>
          </div>
          <div class="kpi-card__info">
            <span class="kpi-card__num" style="color: var(--color-primary)">{{ totalUsuarios }}</span>
            <span class="kpi-card__label">Usuarios totales</span>
            <span class="kpi-card__sub" style="color: var(--color-primary)">
              {{ stats.usuarios_activos }} activos
            </span>
          </div>
        </div>

        <div class="kpi-card"
          @mouseenter="hoveredCard = 'animales'"
          @mouseleave="hoveredCard = null"
          :class="{ 'card-hovered': hoveredCard === 'animales' }">
          <div class="kpi-card__icon" style="background: var(--color-primary-pale)">
            <img src="../assets/cow-icon.png" alt="animales" class="kpi-cow-img" />
          </div>
          <div class="kpi-card__info">
            <span class="kpi-card__num" style="color: var(--color-primary)">{{ stats.total_animales }}</span>
            <span class="kpi-card__label">Animales</span>
            <span class="kpi-card__sub" style="color: var(--color-primary)">
                en {{ stats.total_fincas }} {{ stats.total_fincas === 1 ? 'finca' : 'fincas' }}
            </span>
          </div>
        </div>

        <div class="kpi-card"
          @mouseenter="hoveredCard = 'pesajes'"
          @mouseleave="hoveredCard = null"
          :class="{ 'card-hovered': hoveredCard === 'pesajes' }">
          <div class="kpi-card__icon" style="background: var(--color-primary-pale)">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="3" x2="12" y2="21"/>
              <path d="M5 21h14"/>
              <path d="M5 7l7-4 7 4"/>
              <path d="M5 7c0 3-2 5-2 5h4s-2-2-2-5z"/>
              <path d="M19 7c0 3-2 5-2 5h4s-2-2-2-5z"/>
            </svg>
          </div>
          <div class="kpi-card__info">
            <span class="kpi-card__num" style="color: var(--color-primary)">{{ stats.total_pesajes }}</span>
            <span class="kpi-card__label">Pesajes totales</span>
            <span class="kpi-card__sub" style="color: var(--color-primary)">
              {{ pesajesPorAnimal }} por animal
            </span>
          </div>
        </div>

        <div class="kpi-card"
          @mouseenter="hoveredCard = 'fincas'"
          @mouseleave="hoveredCard = null"
          :class="{ 'card-hovered': hoveredCard === 'fincas' }">
          <div class="kpi-card__icon" style="background: var(--color-primary-pale)">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div class="kpi-card__info">
            <span class="kpi-card__num" style="color: var(--color-primary)">{{ stats.total_fincas }}</span>
            <span class="kpi-card__label">Fincas activas</span>
            <span class="kpi-card__sub" style="color: var(--color-primary)">
              en operación
            </span>
          </div>
        </div>

      </div>

      <!-- ── Fila 2: Dona + Roles ── -->
      <div class="mid-row">

        <!-- Usuarios activos/inactivos -->
        <div class="metric-card" @mouseenter="recargarGauge">
          <div class="metric-card__header">
            <svg class="metric-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="7" r="3"/>
              <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
            </svg>
            <span>Estado de Usuarios</span>
          </div>
          <div class="dona-container">
            <svg class="dona-svg" viewBox="0 0 140 140">
              <!-- Fondo -->
              <circle cx="70" cy="70" r="54" fill="none" stroke="var(--color-border)" stroke-width="18"/>
              <!-- Inactivos -->
              <circle cx="70" cy="70" r="54" fill="none"
                stroke="var(--color-error)"
                stroke-width="18"
                stroke-dasharray="339 0"
                stroke-dashoffset="85"/>
              <!-- Activos -->
              <circle cx="70" cy="70" r="54" fill="none"
                stroke="var(--color-primary)"
                stroke-width="18"
                :stroke-dasharray="`${donaActivos} ${donaTotalCirc}`"
                stroke-dashoffset="85"
                style="transition: stroke-dasharray 1s ease"/>
              <!-- Centro -->
              <circle cx="70" cy="70" r="36" fill="var(--color-surface)"/>
              <text x="70" y="64" text-anchor="middle" font-size="20" font-weight="700"
                fill="var(--color-text)" font-family="Georgia, serif">
                {{ pctActivos }}%
              </text>
              <text x="70" y="80" text-anchor="middle" font-size="9"
                fill="var(--color-text-muted)" font-family="system-ui, sans-serif">
                activos
              </text>
            </svg>
            <div class="dona-detalle">
              <div class="dona-detalle__item">
                <div class="dona-detalle__dot" style="background: var(--color-primary)"></div>
                <div>
                  <p class="dona-detalle__num">{{ stats.usuarios_activos }}</p>
                  <p class="dona-detalle__lbl">Activos</p>
                </div>
              </div>
              <div class="dona-detalle__item">
                <div class="dona-detalle__dot" style="background: var(--color-error)"></div>
                <div>
                  <p class="dona-detalle__num">{{ stats.usuarios_inactivos }}</p>
                  <p class="dona-detalle__lbl">Inactivos</p>
                </div>
              </div>
              <div class="dona-detalle__item">
                <div class="dona-detalle__dot" style="background: var(--color-border)"></div>
                <div>
                  <p class="dona-detalle__num">{{ totalUsuarios }}</p>
                  <p class="dona-detalle__lbl">Total</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Distribución por rol — barras de progreso -->
        <div class="metric-card">
          <div class="metric-card__header">
            <svg class="metric-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="6" height="13" rx="1"/>
              <rect x="9" y="3" width="6" height="17" rx="1"/>
              <rect x="16" y="10" width="6" height="10" rx="1"/>
            </svg>
            <span>Distribución por Rol</span>
          </div>
          <div class="roles-lista">

            <div class="rol-item"
              @mouseenter="hoveredCard = 'rol-ganaderos'"
              @mouseleave="hoveredCard = null"
              :class="{ 'rol-hovered': hoveredCard === 'rol-ganaderos' }">
              <div class="rol-item__top">
                <div class="rol-item__info">
                  <img src="../assets/cow-icon.png" alt="ganaderos" class="rol-cow-img" />
                  <span class="rol-item__nombre">Ganaderos</span>
                </div>
                <span class="rol-item__num" style="color: var(--color-gray)">
                  {{ stats.usuarios_por_rol?.ganaderos }}
                </span>
              </div>
              <div class="barra-bg">
                <div class="barra-fill"
                  :style="{ width: pctRol(stats.usuarios_por_rol?.ganaderos) + '%', background: 'var(--color-gray)' }">
                </div>
              </div>
              <span class="barra-pct">{{ pctRol(stats.usuarios_por_rol?.ganaderos) }}%</span>
            </div>

            <div class="rol-item"
              @mouseenter="hoveredCard = 'rol-vet'"
              @mouseleave="hoveredCard = null"
              :class="{ 'rol-hovered': hoveredCard === 'rol-vet' }">
              <div class="rol-item__top">
                <div class="rol-item__info">
                  <svg class="rol-icon" viewBox="0 0 24 24" fill="none" stroke="var(--color-blue)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/>
                    <line x1="8" y1="3" x2="8" y2="7"/>
                    <line x1="16" y1="3" x2="16" y2="7"/>
                    <path d="M12 16v3"/>
                    <circle cx="12" cy="21" r="2"/>
                  </svg>
                  <span class="rol-item__nombre">Veterinarios</span>
                </div>
                <span class="rol-item__num" style="color: var(--color-blue)">
                  {{ stats.usuarios_por_rol?.veterinarios }}
                </span>
              </div>
              <div class="barra-bg">
                <div class="barra-fill"
                  :style="{ width: pctRol(stats.usuarios_por_rol?.veterinarios) + '%', background: 'var(--color-blue)' }">
                </div>
              </div>
              <span class="barra-pct">{{ pctRol(stats.usuarios_por_rol?.veterinarios) }}%</span>
            </div>

            <div class="rol-item"
              @mouseenter="hoveredCard = 'rol-ay'"
              @mouseleave="hoveredCard = null"
              :class="{ 'rol-hovered': hoveredCard === 'rol-ay' }">
              <div class="rol-item__top">
                <div class="rol-item__info">
                  <svg class="rol-icon" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/>
                    <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/>
                    <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/>
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34L4 19"/>
                  </svg>
                  <span class="rol-item__nombre">Ayudantes</span>
                </div>
                <span class="rol-item__num" style="color: var(--color-amber)">
                  {{ stats.usuarios_por_rol?.ayudantes }}
                </span>
              </div>
              <div class="barra-bg">
                <div class="barra-fill"
                  :style="{ width: pctRol(stats.usuarios_por_rol?.ayudantes) + '%', background: 'var(--color-amber)' }">
                </div>
              </div>
              <span class="barra-pct">{{ pctRol(stats.usuarios_por_rol?.ayudantes) }}%</span>
            </div>

            <div class="rol-item"
              @mouseenter="hoveredCard = 'rol-tec'"
              @mouseleave="hoveredCard = null"
              :class="{ 'rol-hovered': hoveredCard === 'rol-tec' }">
              <div class="rol-item__top">
                <div class="rol-item__info">
                  <svg class="rol-icon" viewBox="0 0 24 24" fill="none" stroke="var(--color-purple)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                  <span class="rol-item__nombre">Técnicos</span>
                </div>
                <span class="rol-item__num" style="color: var(--color-purple)">
                  {{ stats.usuarios_por_rol?.tecnicos }}
                </span>
              </div>
              <div class="barra-bg">
                <div class="barra-fill"
                  :style="{ width: pctRol(stats.usuarios_por_rol?.tecnicos) + '%', background: 'var(--color-purple)' }">
                </div>
              </div>
              <span class="barra-pct">{{ pctRol(stats.usuarios_por_rol?.tecnicos) }}%</span>
            </div>

          </div>
        </div>

        <!-- Gauge pesajes por animal -->
        <div class="metric-card" @mouseenter="recargarGauge">
          <div class="metric-card__header">
            <svg class="metric-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="3" x2="12" y2="21" />
              <path d="M5 21h14" />
              <path d="M5 7l7-4 7 4" />
              <path d="M5 7c0 3-2 5-2 5h4s-2-2-2-5z" />
              <path d="M19 7c0 3-2 5-2 5h4s-2-2-2-5z" />
            </svg>
            <span>Actividad de Pesaje</span>
          </div>

          <!-- Gauge SVG semicircular -->
          <div class="gauge-wrap">
            <svg class="gauge-svg" viewBox="0 0 160 100">
              <!-- Arco fondo -->
              <path d="M 16 90 A 64 64 0 0 1 144 90" fill="none" stroke="var(--color-border)" stroke-width="14"
                stroke-linecap="round" />
              <!-- Arco activo — key fuerza re-render en cada hover -->
              <path ref="gaugeEl" d="M 16 90 A 64 64 0 0 1 144 90" fill="none" stroke="var(--color-primary)"
                stroke-width="14" stroke-linecap="round" :stroke-dasharray="`${gaugeActivo} 201`"
                style="transition: stroke-dasharray 1s ease" />
              <text x="80" y="82" text-anchor="middle" font-size="22" font-weight="700" fill="var(--color-primary)"
                font-family="Georgia, serif">
                {{ stats.total_pesajes }}
              </text>
              <text x="80" y="96" text-anchor="middle" font-size="8" fill="var(--color-text-muted)"
                font-family="system-ui, sans-serif">
                pesajes totales
              </text>
            </svg>
          </div>

          <div class="gauge-detalle">
            <div class="gauge-detalle__item">
              <span class="gauge-detalle__num" style="color: var(--color-gray)">{{ stats.total_animales }}</span>
              <span class="gauge-detalle__lbl">Animales</span>
            </div>
            <div class="gauge-detalle__sep"></div>
            <div class="gauge-detalle__item">
              <span class="gauge-detalle__num" style="color: var(--color-primary)">{{ pesajesPorAnimal }}</span>
              <span class="gauge-detalle__lbl">Pesajes / animal</span>
            </div>
            <div class="gauge-detalle__sep"></div>
            <div class="gauge-detalle__item">
              <span class="gauge-detalle__num" style="color: var(--color-primary)">{{ stats.total_fincas }}</span>
              <span class="gauge-detalle__lbl">Fincas</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Fila 3: Banner resumen ── -->
      <div class="banner-card">
        <div class="banner-card__header">
          <img src="../assets/cow-icon.png" alt="BovWeight" class="banner-cow-img" />
          <div>
            <p class="banner-card__title">Sistema de Pesaje Bovino</p>
            <p class="banner-card__sub">Monitoreo y control de peso de ganado en tiempo real</p>
          </div>
        </div>
        <div class="banner-card__stats">
          <div class="banner-card__stat">
            <span class="banner-card__num">{{ stats.total_pesajes }}</span>
            <span class="banner-card__lbl">Pesajes totales</span>
          </div>
          <div class="banner-card__divider"></div>
          <div class="banner-card__stat">
            <span class="banner-card__num">{{ stats.total_animales }}</span>
            <span class="banner-card__lbl">Animales registrados</span>
          </div>
          <div class="banner-card__divider"></div>
          <div class="banner-card__stat">
            <span class="banner-card__num">{{ totalUsuarios }}</span>
            <span class="banner-card__lbl">Usuarios activos</span>
          </div>
          <div class="banner-card__divider"></div>
          <div class="banner-card__stat">
            <span class="banner-card__num">{{ stats.total_fincas }}</span>
            <span class="banner-card__lbl">{{ stats.total_fincas === 1 ? 'Finca activa' : 'Fincas activas' }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { dashboardService } from '../services/dashboard'
import { useAuthStore } from '../stores/auth'

const stats       = ref({})
const loading     = ref(true)
const hoveredCard = ref(null)
const auth        = useAuthStore()
const gaugeEl = ref(null)

function recargarGauge() {
  const el = gaugeEl.value
  if (!el) return
  // Reinicia desde 0
  el.style.transition = 'none'
  el.setAttribute('stroke-dasharray', `0 201`)
  // Fuerza reflow
  el.getBoundingClientRect()
  // Anima hasta el valor real
  el.style.transition = 'stroke-dasharray 1s ease'
  el.setAttribute('stroke-dasharray', `${gaugeActivo.value} 201`)
}

// ── Fecha ─────────────────────────────────────────────
const fechaHoy = new Date().toLocaleDateString('es-CR', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

// ── Computed ──────────────────────────────────────────
const totalUsuarios = computed(() =>
  (stats.value.usuarios_activos ?? 0) + (stats.value.usuarios_inactivos ?? 0)
)

const pctActivos = computed(() => {
  if (!totalUsuarios.value) return 0
  return Math.round((stats.value.usuarios_activos / totalUsuarios.value) * 100)
})

const pesajesPorAnimal = computed(() => {
  if (!stats.value.total_animales) return 0
  return (stats.value.total_pesajes / stats.value.total_animales).toFixed(1)
})

// Dona: 2*π*54 ≈ 339
const donaTotalCirc = 339
const donaActivos = computed(() => {
  if (!totalUsuarios.value) return 0
  return (stats.value.usuarios_activos / totalUsuarios.value) * donaTotalCirc
})

// Gauge semicircular: arco total ≈ 201px, máximo referencia = 50 pesajes
const gaugeMax = 50
const gaugeActivo = computed(() => {
  const pct = Math.min((stats.value.total_pesajes ?? 0) / gaugeMax, 1)
  return pct * 201
})

// Barras de rol: % sobre total de usuarios
function pctRol(valor) {
  if (!totalUsuarios.value || !valor) return 0
  return Math.round((valor / totalUsuarios.value) * 100)
}

// ── Carga ─────────────────────────────────────────────
async function cargarEstadisticas() {
  try {
    const response = await dashboardService.getEstadisticas()
    stats.value = response.data
    console.log('stats:', response.data) // agrega esto
  } finally {
    loading.value = false
  }
}

onMounted(cargarEstadisticas)
</script>

<style scoped>
.inicio {
  padding: 2rem 2.5rem;
  max-width: 1200px;
  font-family: var(--font-ui);
}

/* ── Bienvenida ── */
.bienvenida {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.bienvenida h2 {
  font-family: var(--font-base);
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  letter-spacing: -0.4px;
  margin: 0;
}
.header-sub {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  font-family: var(--font-ui);
  margin-top: 0.3rem;
  text-transform: capitalize;
}
.bienvenida__cow {
  width: 56px;
  height: 56px;
  object-fit: contain;
  opacity: 0.85;
  filter: invert(25%) sepia(50%) saturate(600%) hue-rotate(112deg) brightness(75%) contrast(95%);
}

/* ── Loading ── */
.cargando {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem;
  color: var(--color-text-muted);
}
.cargando-icon {
  width: 52px;
  height: 52px;
  object-fit: contain;
  animation: bounce 0.9s ease-in-out infinite alternate;
  filter: invert(25%) sepia(50%) saturate(600%) hue-rotate(112deg) brightness(75%) contrast(95%);
}
@keyframes bounce {
  from { transform: translateY(0); }
  to   { transform: translateY(-14px); }
}

@keyframes gaugeLoad {
  from { stroke-dasharray: 0 201; }
  to   { stroke-dasharray: var(--gauge-target, 201) 201; }
}

/* ── Grid principal ── */
.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ── KPIs fila ── */
.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.kpi-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: 1.2rem 1.4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  cursor: default;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card-hovered {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.kpi-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  flex-shrink: 0;
}
.kpi-card__icon svg { width: 100%; height: 100%; }
.kpi-cow-img {
  width: 26px;
  height: 26px;
  object-fit: contain;
  filter: invert(25%) sepia(50%) saturate(600%) hue-rotate(112deg) brightness(75%) contrast(95%);
}
.kpi-card__info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.kpi-card__num {
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1;
  font-family: var(--font-base);
}
.kpi-card__label {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  font-weight: 500;
}
.kpi-card__sub {
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.1rem;
}

/* ── Fila media ── */
.mid-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}
.metric-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: 1.4rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.metric-card__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--font-ui);
}
.metric-card__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* ── Dona ── */
.dona-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}
.dona-svg {
  width: 130px;
  height: 130px;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.07));
}
.dona-detalle {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.dona-detalle__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.dona-detalle__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dona-detalle__num {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  font-family: var(--font-base);
  margin: 0;
}
.dona-detalle__lbl {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin: 0;
  font-family: var(--font-ui);
}

/* ── Roles ── */
.roles-lista {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.rol-item {
  padding: 0.5rem 0.6rem;
  border-radius: var(--radius-md);
  transition: background 0.2s;
  cursor: default;
}
.rol-hovered { background: var(--color-bg); }
.rol-item__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}
.rol-item__info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rol-cow-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  filter: invert(31%) sepia(44%) saturate(548%) hue-rotate(106deg) brightness(82%) contrast(89%);
}
.rol-icon {
  width: 18px;
  height: 18px;
}
.rol-item__nombre {
  font-size: 0.82rem;
  color: var(--color-text);
  font-family: var(--font-ui);
  font-weight: 500;
}
.rol-item__num {
  font-size: 0.9rem;
  font-weight: 700;
  font-family: var(--font-base);
}
.barra-bg {
  height: 6px;
  background: var(--color-bg);
  border-radius: 99px;
  overflow: hidden;
}
.barra-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.8s ease;
}
.barra-pct {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  font-family: var(--font-ui);
  margin-top: 0.2rem;
  display: block;
  text-align: right;
}

/* ── Gauge ── */
.gauge-wrap {
  display: flex;
  justify-content: center;
}
.gauge-svg {
  width: 160px;
  height: 100px;
}
.gauge-detalle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0 0.5rem;
}
.gauge-detalle__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}
.gauge-detalle__num {
  font-size: 1.2rem;
  font-weight: 700;
  font-family: var(--font-base);
}
.gauge-detalle__lbl {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  font-family: var(--font-ui);
  white-space: nowrap;
  text-align: center;
}
.gauge-detalle__sep {
  width: 1px;
  height: 30px;
  background: var(--color-border);
}

/* ── Banner card ── */
.banner-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  border: 1px solid var(--color-border);
}
.banner-card__header {
  background: var(--color-primary-dark);
  padding: 1.1rem 1.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.banner-cow-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.9;
}
.banner-card__title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  font-family: var(--font-base);
  margin: 0;
}
.banner-card__sub {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
  margin: 0.15rem 0 0;
  font-family: var(--font-ui);
}
.banner-card__stats {
  padding: 1.2rem 1.8rem;
  display: flex;
  align-items: center;
  gap: 0;
}
.banner-card__stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}
.banner-card__num {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  font-family: var(--font-base);
}
.banner-card__lbl {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-family: var(--font-ui);
  white-space: nowrap;
}
.banner-card__divider {
  width: 1px;
  height: 40px;
  background: var(--color-border);
  flex-shrink: 0;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .kpi-row { grid-template-columns: repeat(2, 1fr); }
  .mid-row  { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .inicio   { padding: 1.2rem; }
  .kpi-row  { grid-template-columns: 1fr 1fr; }
  .banner-card__stats { flex-wrap: wrap; }
}
</style>