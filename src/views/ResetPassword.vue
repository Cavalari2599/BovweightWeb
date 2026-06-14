<template>
  <div class="login-container">

    <div class="background-scene">
      <div class="sun"></div>
      <div class="cloud cloud-1"></div>
      <div class="cloud cloud-2"></div>
      <div class="cloud cloud-3"></div>

      <!-- Vacas -->
      <svg
        v-for="(cow, index) in cows"
        :key="cow.id"
        :ref="el => { if (el) cowEls[index] = el }"
        class="cow"
        :style="{
          left: cow.left,
          bottom: cow.bottom,
          width: cow.size + 'px',
          transform: cow.flip ? 'scaleX(-1)' : 'none'
        }"
        :width="cow.size"
        :height="cow.size * 0.85"
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
            transform: `rotate(${headAngles[cow.id]}deg)`,
            transformOrigin: '28px 40px',
            transition: 'transform 0.5s ease-in-out'
          }"
        >
          <path d="M 25 42 Q 20 38 18 32 Q 22 28 28 30 L 30 42 Z" fill="#f5f5f5" stroke="#333" stroke-width="0.3" />
          <ellipse cx="16" cy="28" rx="12" ry="10" fill="#f5f5f5" stroke="#333" stroke-width="0.5" />
          <path d="M 10 22 Q 14 18 20 20 Q 22 26 18 28 Q 12 28 10 22" fill="#2d2d2d" />
          <ellipse cx="6" cy="20" rx="4" ry="2.5" fill="#ffcdd2" stroke="#333" stroke-width="0.3" transform="rotate(-30 6 20)" />
          <ellipse cx="26" cy="20" rx="4" ry="2.5" fill="#ffcdd2" stroke="#333" stroke-width="0.3" transform="rotate(30 26 20)" />
          <path d="M 10 18 Q 8 12 10 10" fill="none" stroke="#f5f5dc" stroke-width="2" stroke-linecap="round" />
          <path d="M 22 18 Q 24 12 22 10" fill="none" stroke="#f5f5dc" stroke-width="2" stroke-linecap="round" />
          <!-- Ojos cerrados al escribir contraseña -->
          <circle cx="11" cy="26" r="3" fill="white" stroke="#333" stroke-width="0.3" />
          <circle cx="21" cy="26" r="3" fill="white" stroke="#333" stroke-width="0.3" />
          <template v-if="!passwordFocused">
            <circle cx="11" cy="26" r="1.5" fill="#1a1a1a"
              :style="{ transform: `translate(${eyeOffsets[cow.id].x}px, ${eyeOffsets[cow.id].y}px)`, transition: 'transform 0.08s ease-out' }" />
            <circle cx="21" cy="26" r="1.5" fill="#1a1a1a"
              :style="{ transform: `translate(${eyeOffsets[cow.id].x}px, ${eyeOffsets[cow.id].y}px)`, transition: 'transform 0.08s ease-out' }" />
            <circle cx="10" cy="25" r="0.6" fill="white"
              :style="{ transform: `translate(${eyeOffsets[cow.id].x * 0.5}px, ${eyeOffsets[cow.id].y * 0.5}px)` }" />
            <circle cx="20" cy="25" r="0.6" fill="white"
              :style="{ transform: `translate(${eyeOffsets[cow.id].x * 0.5}px, ${eyeOffsets[cow.id].y * 0.5}px)` }" />
          </template>
          <template v-else>
            <line x1="8.5" y1="26" x2="13.5" y2="26" stroke="#333" stroke-width="1.5" stroke-linecap="round" />
            <line x1="18.5" y1="26" x2="23.5" y2="26" stroke="#333" stroke-width="1.5" stroke-linecap="round" />
          </template>
          <ellipse cx="16" cy="34" rx="6" ry="4" fill="#ffcdd2" stroke="#333" stroke-width="0.3" />
          <circle cx="14" cy="34" r="1" fill="#333" />
          <circle cx="18" cy="34" r="1" fill="#333" />
          <path d="M 13 37 Q 16 39 19 37" fill="none" stroke="#333" stroke-width="0.5" stroke-linecap="round" />
        </g>
      </svg>

      <!-- Valla -->
      <div class="fence-area">
        <svg viewBox="0 0 1000 60" preserveAspectRatio="none" class="fence-svg">
          <rect x="0"   y="15" width="1000" height="6" rx="2" fill="#8B6914" />
          <rect x="0"   y="34" width="1000" height="6" rx="2" fill="#7a5c10" />
          <rect x="10"  y="2" width="12" height="58" rx="3" fill="#a07820" />
          <rect x="90"  y="2" width="12" height="58" rx="3" fill="#a07820" />
          <rect x="170" y="2" width="12" height="58" rx="3" fill="#a07820" />
          <rect x="250" y="2" width="12" height="58" rx="3" fill="#a07820" />
          <rect x="330" y="2" width="12" height="58" rx="3" fill="#a07820" />
          <rect x="410" y="2" width="12" height="58" rx="3" fill="#a07820" />
          <rect x="490" y="2" width="12" height="58" rx="3" fill="#a07820" />
          <rect x="570" y="2" width="12" height="58" rx="3" fill="#a07820" />
          <rect x="650" y="2" width="12" height="58" rx="3" fill="#a07820" />
          <rect x="730" y="2" width="12" height="58" rx="3" fill="#a07820" />
          <rect x="810" y="2" width="12" height="58" rx="3" fill="#a07820" />
          <rect x="890" y="2" width="12" height="58" rx="3" fill="#a07820" />
          <rect x="978" y="2" width="12" height="58" rx="3" fill="#a07820" />
        </svg>
      </div>
      <div class="ground-flat"></div>
    </div>

    <!-- Caja -->
    <div class="login-box">
      <div class="login-box__header">
        <h1>BovWeight CR</h1>
        <h2>Restablecer Contraseña</h2>
      </div>

      <p v-if="enlaceInvalido" class="error-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        El enlace de recuperación es inválido o ha expirado.
      </p>

      <form v-else-if="!success" @submit.prevent="handleSubmit" novalidate>
  <div class="form-group">
    <label>Nueva contraseña</label>
    <div class="password-wrapper">
      <input
        v-model="clave"
        :type="showClave ? 'text' : 'password'"
        placeholder="••••••••"
        @focus="passwordFocused = true"
        @blur="passwordFocused = false; tocadoClave = true"
        @input="tocadoClave = true"
      />
      <button type="button" class="toggle-pw" @click="showClave = !showClave">
        <svg v-if="!showClave" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
        <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      </button>
    </div>
    <div v-if="tocadoClave && errorClave" class="campo-error">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {{ errorClave }}
    </div>
  </div>

  <div class="form-group">
    <label>Confirmar contraseña</label>
    <div class="password-wrapper">
      <input
        v-model="clave_confirmation"
        :type="showConfirmar ? 'text' : 'password'"
        placeholder="••••••••"
        @focus="passwordFocused = true"
        @blur="passwordFocused = false; tocadoConfirmacion = true"
        @input="tocadoConfirmacion = true"
      />
      <button type="button" class="toggle-pw" @click="showConfirmar = !showConfirmar">
        <svg v-if="!showConfirmar" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
        <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      </button>
    </div>
    <div v-if="tocadoConfirmacion && errorConfirmacion" class="campo-error">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {{ errorConfirmacion }}
    </div>
    <div v-if="clave_confirmation && clave && !errorConfirmacion" class="campo-exito">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      Las contraseñas coinciden
    </div>
  </div>

  <p v-if="error" class="error">{{ error }}</p>

  <button type="submit" :disabled="loading">
    {{ loading ? 'Restableciendo...' : 'Restablecer contraseña' }}
  </button>
</form>

      <div v-else class="success-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <p>Contraseña restablecida correctamente. Redirigiendo al login...</p>
      </div>

      <div class="link-container">
        <RouterLink to="/login">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Volver al login
        </RouterLink>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { resetPassword } from '../services/auth'

const route  = useRoute()
const router = useRouter()

const clave             = ref('')
const clave_confirmation = ref('')
const error             = ref('')
const loading           = ref(false)
const success           = ref(false)
const enlaceInvalido    = ref(false)
const showClave         = ref(false)
const showConfirmar     = ref(false)
const passwordFocused   = ref(false)
const screenWidth       = ref(window.innerWidth)

const tocadoClave        = ref(false)
const tocadoConfirmacion = ref(false)

const errorClave = computed(() => {
  if (!clave.value) return 'La contraseña es requerida'
  if (clave.value.length < 8) return 'Mínimo 8 caracteres'
  return ''
})

const errorConfirmacion = computed(() => {
  if (!clave_confirmation.value) return 'Confirma la contraseña'
  if (clave_confirmation.value !== clave.value) return 'Las contraseñas no coinciden'
  return ''
})

let token  = ''
let correo = ''

onMounted(() => {
  token  = route.query.token  || ''
  correo = route.query.correo || ''
  if (!token || !correo) enlaceInvalido.value = true
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', onResize)
})

// ── Vacas ──────────────────────────────────────────────
const allCows = [
  { id: 0, left: '3%',  bottom: '75px', size: 95,  flip: false },
  { id: 1, left: '18%', bottom: '75px', size: 115, flip: true  },
  { id: 2, left: '38%', bottom: '75px', size: 100, flip: false },
  { id: 3, left: '58%', bottom: '75px', size: 110, flip: true  },
  { id: 4, left: '78%', bottom: '75px', size: 88,  flip: false },
]
const cows = computed(() => {
  if (screenWidth.value < 480) return [allCows[0], allCows[4]]
  if (screenWidth.value < 768) return [allCows[0], allCows[2], allCows[4]]
  return allCows
})
const cowEls     = []
const eyeOffsets = reactive(allCows.map(() => ({ x: 0, y: 0 })))
const headAngles = reactive(allCows.map(() => 0))

watch(passwordFocused, (focused) => {
  if (!focused) {
    allCows.forEach(cow => {
      eyeOffsets[cow.id].x = 0
      eyeOffsets[cow.id].y = 0
      headAngles[cow.id]   = 0
    })
  }
})

function handleMouseMove(e) {
  if (passwordFocused.value) {
    allCows.forEach(cow => { headAngles[cow.id] = 15 })
    return
  }
  cows.value.forEach((cow, index) => {
    const el = cowEls[index]
    if (!el) return
    const rect       = el.getBoundingClientRect()
    const cowCenterX = rect.left + rect.width  / 2
    const cowCenterY = rect.top  + rect.height / 3
    const dx         = e.clientX - cowCenterX
    const dy         = e.clientY - cowCenterY
    const distance   = Math.sqrt(dx * dx + dy * dy)
    const maxOffset  = 2.5
    const normalizedX = (dx / Math.max(distance, 1)) * maxOffset
    const normalizedY = (dy / Math.max(distance, 1)) * maxOffset
    eyeOffsets[cow.id].x = cow.flip ? -normalizedX : normalizedX
    eyeOffsets[cow.id].y = normalizedY
    const effectiveDx  = cow.flip ? -dx : dx
    const angle        = Math.atan2(dy, effectiveDx) * (180 / Math.PI)
    headAngles[cow.id] = Math.max(-18, Math.min(18, angle * 0.25))
  })
}

function onResize() {
  screenWidth.value = window.innerWidth
  cowEls.length = 0
}

async function handleSubmit() {
  tocadoClave.value        = true
  tocadoConfirmacion.value = true
  if (errorClave.value || errorConfirmacion.value) return

  error.value   = ''
  loading.value = true
  try {
    await resetPassword(correo, token, clave.value, clave_confirmation.value)
    success.value = true
    setTimeout(() => router.push('/login'), 3000)
  } catch (e) {
    error.value = e.response?.data?.message || 'El token es inválido o ha expirado.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    #87ceeb 0%,
    #5ba8d4 30%,
    #3a8fbf 60%,
    #4a9c6e 80%,
    #3a7d4a 100%
  );
}

/* ── Nubes ── */
.cloud {
  position: absolute;
  background: rgba(255,255,255,0.85);
  border-radius: 50px;
  pointer-events: none;
}
.cloud::before, .cloud::after {
  content: '';
  position: absolute;
  background: rgba(255,255,255,0.85);
  border-radius: 50%;
}
.cloud-1 { width: 120px; height: 36px; top: 80px; left: 8%; animation: cloud-drift 18s linear infinite; }
.cloud-1::before { width: 60px; height: 55px; top: -28px; left: 18px; }
.cloud-1::after  { width: 45px; height: 42px; top: -20px; left: 52px; }
.cloud-2 { width: 90px; height: 28px; top: 130px; left: 30%; animation: cloud-drift 24s linear infinite 4s; opacity: 0.75; }
.cloud-2::before { width: 44px; height: 42px; top: -22px; left: 14px; }
.cloud-2::after  { width: 34px; height: 32px; top: -16px; left: 40px; }
.cloud-3 { width: 100px; height: 30px; top: 60px; right: 15%; animation: cloud-drift 20s linear infinite 8s; opacity: 0.8; }
.cloud-3::before { width: 50px; height: 46px; top: -24px; left: 16px; }
.cloud-3::after  { width: 38px; height: 36px; top: -18px; left: 48px; }
@keyframes cloud-drift {
  0%   { transform: translateX(0); }
  50%  { transform: translateX(30px); }
  100% { transform: translateX(0); }
}

/* ── Escena ── */
.background-scene {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.sun {
  position: absolute;
  top: 48px; right: 140px;
  width: 80px; height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, #fff9c4 40%, #ffe566 70%, #ffcc00 100%);
  box-shadow: 0 0 40px 14px rgba(255,220,50,0.5);
  animation: sun-pulse 4s ease-in-out infinite;
}
@keyframes sun-pulse {
  0%, 100% { box-shadow: 0 0 40px 14px rgba(255,220,50,0.5); }
  50%       { box-shadow: 0 0 70px 26px rgba(255,220,50,0.7); }
}
.cow {
  position: absolute;
  pointer-events: all;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.18));
  z-index: 4;
}
.fence-area {
  position: absolute;
  bottom: 98px; left: 0; right: 0;
  height: 58px; z-index: 3;
  pointer-events: none;
}
.fence-svg { width: 100%; height: 100%; }
.ground-flat {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 110px;
  background: linear-gradient(to top, #2d5a1b 0%, #3a7d22 50%, #4a9c2a 100%);
  z-index: 2;
}

/* ── Caja ── */
.login-box {
  position: relative;
  z-index: 10;
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.35);
  padding: 2.5rem 2.2rem;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.4);
  width: 100%;
  max-width: 420px;
  margin: 0 1rem;
  margin-bottom: 140px;
}

.login-box__header { text-align: center; margin-bottom: 2rem; }

h1 {
  color: #ffffff;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.25);
}
h2 {
  text-align: center;
  color: rgba(255,255,255,0.85);
  font-size: 0.95rem;
  font-weight: 400;
  margin-bottom: 0;
}

.form-group { margin-bottom: 1.3rem; }

label {
  display: block;
  margin-bottom: 0.35rem;
  color: rgba(255,255,255,0.9);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.3px;
}

input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  background: rgba(255,255,255,0.25);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box;
  color: #ffffff;
  transition: border-color 0.2s, background 0.2s;
}
input::placeholder { color: rgba(255,255,255,0.6); }
input:focus {
  outline: none;
  border-color: rgba(255,255,255,0.8);
  background: rgba(255,255,255,0.32);
}

.password-wrapper { position: relative; }

.toggle-pw {
  position: absolute;
  right: 0.7rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(255,255,255,0.7);
  padding: 0;
  display: flex;
  align-items: center;
  width: auto;
  box-shadow: none;
  margin: 0;
}
.toggle-pw:hover { color: #ffffff; background: none; box-shadow: none; }

button[type="submit"] {
  width: 100%;
  padding: 0.85rem;
  background: rgba(255,255,255,0.9);
  color: var(--color-primary-dark);
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}
button[type="submit"]:hover:not(:disabled) {
  background: #ffffff;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  transform: translateY(-1px);
}
button[type="submit"]:disabled {
  background: rgba(255,255,255,0.4);
  color: rgba(255,255,255,0.6);
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.error {
  color: #ffe0e0;
  font-size: 0.85rem;
  text-align: center;
  margin-bottom: 0.3rem;
  text-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.error-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffe0e0;
  font-size: 0.85rem;
  background: rgba(230,57,70,0.2);
  border: 1px solid rgba(230,57,70,0.3);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
}
.error-wrap svg { width: 16px; height: 16px; flex-shrink: 0; }

/* Éxito */
.success-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255,255,255,0.15);
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255,255,255,0.3);
}
.success-wrap svg { width: 36px; height: 36px; stroke: #b7e4c7; }
.success-wrap p {
  color: rgba(255,255,255,0.95);
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
  font-family: var(--font-ui);
}

/* Link volver */
.link-container { text-align: center; margin-top: 1rem; }
.link-container a {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: rgba(255,255,255,0.85);
  font-size: 0.85rem;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.link-container a svg { width: 14px; height: 14px; }
.link-container a:hover { color: #ffffff; text-decoration: underline; }

.campo-error {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.4rem;
  font-size: 0.78rem;
  color: #ffe0e0;
  font-weight: 500;
  background: rgba(230, 57, 70, 0.2);
  border: 1px solid rgba(230, 57, 70, 0.35);
  border-radius: 8px;
  padding: 0.4rem 0.7rem;
  animation: fadeIn 0.2s ease;
}
.campo-error svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}
.campo-exito {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.4rem;
  font-size: 0.78rem;
  color: #b7e4c7;
  font-weight: 500;
  background: rgba(45, 106, 79, 0.2);
  border: 1px solid rgba(45, 106, 79, 0.35);
  border-radius: 8px;
  padding: 0.4rem 0.7rem;
  animation: fadeIn 0.2s ease;
}
.campo-exito svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ── */
@media (max-width: 750px) { .login-box { margin-bottom: 130px; } }
@media (max-width: 550px) {
  .login-box { padding: 2rem 1.4rem; margin-bottom: 120px; }
  h1 { font-size: 1.6rem; }
  .sun { width: 60px; height: 60px; top: 30px; right: 80px; }
}
@media (max-width: 400px) {
  .login-box { margin-bottom: 110px; }
  .ground-flat { height: 90px; }
  .fence-area { bottom: 78px; height: 45px; }
}
</style>