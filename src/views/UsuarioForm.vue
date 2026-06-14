<template>
  <div class="form-container">
    <div class="form-box">

      <!-- Header verde del panel -->
      <div class="panel-header">
        <button class="btn-volver" @click="router.push('/usuarios')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
            stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Volver
        </button>
        <div class="panel-header__titulo">
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.8" stroke-linecap="round"
            stroke-linejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20v-1a8 8 0 0 1 16 0v1" />
          </svg>
          <span>{{ esEdicion ? 'Editar Usuario' : 'Nuevo Usuario' }}</span>
        </div>
        <!-- Vaca sobre el header -->
        <svg ref="vacaRef" class="vaca-panel" viewBox="0 0 100 85">
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
          <path d="M 78 44 Q 88 40 86 48 Q 90 52 88 56" fill="none" stroke="#333" stroke-width="1.2"
            stroke-linecap="round" />
          <ellipse cx="88" cy="57" rx="2" ry="3" fill="#2d2d2d" />
          <g :style="{
            transform: `rotate(${headAngle}deg)`,
            transformOrigin: '28px 40px',
            transition: 'transform 0.12s ease-out'
          }">
            <path d="M 25 42 Q 20 38 18 32 Q 22 28 28 30 L 30 42 Z" fill="#f5f5f5" stroke="#333" stroke-width="0.3" />
            <ellipse cx="16" cy="28" rx="12" ry="10" fill="#f5f5f5" stroke="#333" stroke-width="0.5" />
            <path d="M 10 22 Q 14 18 20 20 Q 22 26 18 28 Q 12 28 10 22" fill="#2d2d2d" />
            <ellipse cx="6" cy="20" rx="4" ry="2.5" fill="#ffcdd2" stroke="#333" stroke-width="0.3"
              transform="rotate(-30 6 20)" />
            <ellipse cx="26" cy="20" rx="4" ry="2.5" fill="#ffcdd2" stroke="#333" stroke-width="0.3"
              transform="rotate(30 26 20)" />
            <path d="M 10 18 Q 8 12 10 10" fill="none" stroke="#f5f5dc" stroke-width="2" stroke-linecap="round" />
            <path d="M 22 18 Q 24 12 22 10" fill="none" stroke="#f5f5dc" stroke-width="2" stroke-linecap="round" />
            <circle cx="11" cy="26" r="3" fill="white" stroke="#333" stroke-width="0.3" />
            <circle cx="21" cy="26" r="3" fill="white" stroke="#333" stroke-width="0.3" />
            <!-- Ojos abiertos -->
            <template v-if="!claveActiva">
              <circle cx="11" cy="26" r="1.5" fill="#1a1a1a"
                :style="{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`, transition: 'transform 0.08s ease-out' }" />
              <circle cx="21" cy="26" r="1.5" fill="#1a1a1a"
                :style="{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`, transition: 'transform 0.08s ease-out' }" />
              <circle cx="10" cy="25" r="0.6" fill="white"
                :style="{ transform: `translate(${eyeOffset.x * 0.5}px, ${eyeOffset.y * 0.5}px)` }" />
              <circle cx="20" cy="25" r="0.6" fill="white"
                :style="{ transform: `translate(${eyeOffset.x * 0.5}px, ${eyeOffset.y * 0.5}px)` }" />
            </template>
            <!-- Ojos cerrados -->
            <template v-else>
              <line x1="8" y1="26" x2="14" y2="26" stroke="#333" stroke-width="1.5" stroke-linecap="round" />
              <line x1="18" y1="26" x2="24" y2="26" stroke="#333" stroke-width="1.5" stroke-linecap="round" />
            </template>
            <ellipse cx="16" cy="34" rx="6" ry="4" fill="#ffcdd2" stroke="#333" stroke-width="0.3" />
            <circle cx="14" cy="34" r="1" fill="#333" />
            <circle cx="18" cy="34" r="1" fill="#333" />
            <path d="M 13 37 Q 16 39 19 37" fill="none" stroke="#333" stroke-width="0.5" stroke-linecap="round" />
          </g>
        </svg>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="form-body" novalidate>

        <!-- Sección: Información personal -->
        <div class="seccion">
          <div class="seccion__titulo">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="1.8" stroke-linecap="round"
              stroke-linejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20v-1a8 8 0 0 1 16 0v1" />
            </svg>
            Información Personal
          </div>

          <!-- Identificación -->
          <div class="form-group"
            :class="{ 'campo-completo': form.identificacion_usuario, 'campo-error': errorVisible('identificacion_usuario') }">
            <label class="field-label">Identificación</label>
            <div class="input-wrap">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <line x1="7" y1="9" x2="17" y2="9" />
                <line x1="7" y1="13" x2="13" y2="13" />
              </svg>
              <input v-model="form.identificacion_usuario" type="text" inputmode="numeric" maxlength="12"
                placeholder="Número de cédula" :disabled="esEdicion" @input="filtrarIdentificacion"
                @blur="marcarTocado('identificacion_usuario')" />
            </div>
            <div v-if="errorVisible('identificacion_usuario')" class="campo-msg-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {{ errores.identificacion_usuario }}
            </div>
          </div>

          <!-- Nombre -->
          <div class="form-row">
            <div class="form-group"
              :class="{ 'campo-completo': form.nombre_usuario, 'campo-error': errorVisible('nombre_usuario') }">
              <label class="field-label">Nombre</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input v-model="form.nombre_usuario" type="text" placeholder="Nombre"
                  @input="marcarTocado('nombre_usuario')" @blur="marcarTocado('nombre_usuario')" />
              </div>
              <div v-if="errorVisible('nombre_usuario')" class="campo-msg-error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {{ errores.nombre_usuario }}
              </div>
            </div>

            <!-- apellido1 -->
            <div class="form-group"
              :class="{ 'campo-completo': form.apellido1_usuario, 'campo-error': errorVisible('apellido1_usuario') }">
              <label class="field-label">Primer Apellido</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input v-model="form.apellido1_usuario" type="text" placeholder="Primer apellido"
                  @input="marcarTocado('apellido1_usuario')" @blur="marcarTocado('apellido1_usuario')" />
              </div>
              <div v-if="errorVisible('apellido1_usuario')" class="campo-msg-error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {{ errores.apellido1_usuario }}
              </div>
            </div>

            <!-- apellido2 -->
            <div class="form-group"
              :class="{ 'campo-completo': form.apellido2_usuario, 'campo-error': errorVisible('apellido2_usuario') }">
              <label class="field-label">Segundo Apellido</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input v-model="form.apellido2_usuario" type="text" placeholder="Segundo apellido"
                  @input="marcarTocado('apellido2_usuario')" @blur="marcarTocado('apellido2_usuario')" />
              </div>
              <div v-if="errorVisible('apellido2_usuario')" class="campo-msg-error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {{ errores.apellido2_usuario }}
              </div>
            </div>
          </div>
        </div>

        <!-- Sección: Acceso al sistema -->
        <div class="seccion">
          <div class="seccion__titulo">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="1.8" stroke-linecap="round"
              stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Acceso al Sistema
          </div>

          <!-- Correo -->
          <div class="form-group" :class="{ 'campo-completo': form.correo, 'campo-error': errorVisible('correo') }">
            <label class="field-label">Correo electrónico</label>
            <div class="input-wrap">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input v-model="form.correo" type="text" placeholder="correo@ejemplo.com"
                @input="marcarTocado('correo')" @blur="marcarTocado('correo')" />
            </div>
            <div v-if="errorVisible('correo')" class="campo-msg-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {{ errores.correo }}
            </div>
          </div>

          <!-- Contraseña -->
          <div class="form-group" :class="{ 'campo-completo': form.clave, 'campo-error': errorVisible('clave') }">
            <label class="field-label">
              {{ esEdicion ? 'Nueva Contraseña (dejar vacío para no cambiar)' : 'Contraseña' }}
            </label>
            <div class="input-wrap">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input v-model="form.clave" :type="showClave ? 'text' : 'password'" placeholder="••••••••"
                :required="!esEdicion" @input="marcarTocado('clave')" @focus="claveActiva = true" @blur="claveActiva = false; marcarTocado('clave')" />
              <button type="button" class="toggle-clave" @click="showClave = !showClave">
                <svg v-if="!showClave" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
            <div v-if="errorVisible('clave')" class="campo-msg-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {{ errores.clave }}
            </div>
            <!-- Indicador de fortaleza -->
            <div v-if="form.clave" class="fortaleza-wrap">
              <div class="fortaleza-barra">
                <div class="fortaleza-fill" :style="{ width: fortaleza.pct + '%', background: fortaleza.color }"></div>
              </div>
              <span class="fortaleza-label" :style="{ color: fortaleza.color }">{{ fortaleza.texto }}</span>
            </div>
          </div>
          <!-- Confirmar contraseña -->
<div class="form-group" :class="{ 'campo-completo': form.confirmarClave && !errores.confirmarClave, 'campo-error': errorVisible('confirmarClave') }">
  <label class="field-label">Confirmar Contraseña</label>
  <div class="input-wrap">
    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      <polyline points="9 16 11 18 15 14"/>
    </svg>
    <input
      v-model="form.confirmarClave"
      :type="showConfirmar ? 'text' : 'password'"
      placeholder="Repite la contraseña"
      @input="marcarTocado('confirmarClave')"
      @focus="claveActiva = true"
      @blur="claveActiva = false; marcarTocado('confirmarClave')"
    />
    <button type="button" class="toggle-clave" @click="showConfirmar = !showConfirmar">
      <svg v-if="!showConfirmar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>
    </button>
  </div>
  <div v-if="errorVisible('confirmarClave')" class="campo-msg-error">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    {{ errores.confirmarClave }}
  </div>
  <!-- Indicador de coincidencia -->
  <div v-if="form.confirmarClave && form.clave && !errores.confirmarClave" class="campo-msg-exito">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    Las contraseñas coinciden
  </div>
</div>

          <!-- Rol -->
          <div class="form-group" :class="{ 'campo-completo': form.id_rol, 'campo-error': errorVisible('id_rol') }">
            <label class="field-label">Rol</label>
            <div class="input-wrap select-wrap">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <select v-model="form.id_rol" @change="marcarTocado('id_rol')" @blur="marcarTocado('id_rol')">
                <option value="" disabled>Seleccione un rol</option>
                <option v-for="rol in roles" :key="rol.id_rol" :value="rol.id_rol">
                  {{ rol.nombre_rol }}
                </option>
              </select>
            </div>
            <div v-if="errorVisible('id_rol')" class="campo-msg-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {{ errores.id_rol }}
            </div>
          </div>
        </div>

        <!-- Mensajes globales -->
        <p v-if="error" class="msg-error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {{ error }}
        </p>
        <p v-if="exito" class="msg-exito">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          {{ exito }}
        </p>
        <!-- Botón guardar -->
        <button type="submit" class="btn-guardar" :disabled="loading">
          <svg v-if="!loading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          <svg v-else class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round">
            <path
              d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          {{ loading ? 'Guardando...' : 'Guardar' }}
        </button>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usuariosService } from '../services/usuarios'
import api from '../services/api'

const router = useRouter()
const route  = useRoute()

const esEdicion = computed(() => !!route.params.id)

const form = ref({
  identificacion_usuario: '',
  nombre_usuario:         '',
  apellido1_usuario:      '',
  apellido2_usuario:      '',
  correo:                 '',
  clave:                  '',
  confirmarClave:         '',
  id_rol:                 '',
})

const roles       = ref([])
const error       = ref('')
const exito       = ref('')
const loading     = ref(false)
const showClave   = ref(false)
const showConfirmar = ref(false)
const claveActiva = ref(false)

// ── Campos tocados ────────────────────────────────────
const tocado = reactive({
  identificacion_usuario: false,
  nombre_usuario:         false,
  apellido1_usuario:      false,
  apellido2_usuario:      false,
  correo:                 false,
  clave:                  false,
  confirmarClave:         false,
  id_rol:                 false,
})

function marcarTocado(campo) {
  tocado[campo] = true
}

function filtrarIdentificacion() {
  // Solo dígitos: elimina letras (incluida la "e"), símbolos y espacios
  form.value.identificacion_usuario = String(form.value.identificacion_usuario).replace(/\D/g, '')
  marcarTocado('identificacion_usuario')
}

// ── Validaciones ──────────────────────────────────────
// Usamos funciones normales en lugar de computed anidados
// para evitar el problema de evaluación lazy

function validarCampo(campo) {
  switch (campo) {

    case 'identificacion_usuario': {
  const v = String(form.value.identificacion_usuario ?? '').trim()
  if (!v || v === '0') return 'La identificación es requerida'
  if (/\D/.test(v)) return 'Solo se permiten números'
  if (v.length < 8 || v.length > 12) return 'Debe tener entre 8 y 12 dígitos'
  return ''
}

    case 'nombre_usuario': {
      const v = String(form.value.nombre_usuario ?? '')
      if (/[0-9]/.test(v)) return 'No se permiten números en el nombre'
      if (!v.trim()) return 'El nombre es requerido'
      return ''
    }

    case 'apellido1_usuario': {
      const v = String(form.value.apellido1_usuario ?? '')
      if (/[0-9]/.test(v)) return 'No se permiten números en el apellido'
      if (!v.trim()) return 'El primer apellido es requerido'
      return ''
    }

    case 'apellido2_usuario': {
      const v = String(form.value.apellido2_usuario ?? '')
      if (v && /[0-9]/.test(v)) return 'No se permiten números en el apellido'
      return ''
    }

    case 'correo': {
  const v = String(form.value.correo ?? '').trim()
  if (!v) return 'El correo es requerido'
  if ((v.match(/@/g) || []).length > 1) return 'Solo debe tener un símbolo @'
  if (!v.includes('@')) return 'Debe incluir el símbolo @ (ej: nombre@dominio.com)'

  const [usuario, dominio] = v.split('@')
  if (!usuario) return 'Falta el nombre antes del @'
  if (!dominio || !dominio.includes('.')) return 'Falta el dominio (ej: .com)'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
    return 'Formato inválido (ej: nombre@dominio.com)'

  return ''
}

    case 'clave': {
  if (esEdicion.value && !form.value.clave) return ''
  const v = String(form.value.clave ?? '')
  console.log('validando clave:', v, 'length:', v.length, 'tocado:', tocado.clave)
  if (!v) return 'La contraseña es requerida'
  if (v.length < 8) return 'Mínimo 8 caracteres'
  return ''
}

    case 'confirmarClave': {
      if (esEdicion.value && !form.value.clave) return ''
      const v = String(form.value.confirmarClave ?? '')
      if (!v) return 'Confirma la contraseña'
      if (v !== form.value.clave) return 'Las contraseñas no coinciden'
      return ''
    }

    case 'id_rol': {
      if (!form.value.id_rol) return 'Seleccione un rol'
      return ''
    }

    default: return ''
  }
}

// Computed que llama las funciones — así Vue detecta las dependencias correctamente
const errores = computed(() => {
  const campos = Object.keys(tocado)
  const resultado = {}
  campos.forEach(c => {
    resultado[c] = validarCampo(c)
  })
  return resultado
})

const formularioValido = computed(() =>
  Object.keys(tocado).every(c => validarCampo(c) === '')
)

function errorVisible(campo) {
  return tocado[campo] && errores.value[campo]
}

// ── Vaca ──────────────────────────────────────────────
const vacaRef   = ref(null)
const eyeOffset = reactive({ x: 0, y: 0 })
const headAngle = ref(0)

function handleMouseMove(e) {
  if (claveActiva.value) return
  const el = vacaRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width  / 2
  const cy = rect.top  + rect.height / 3
  const dx = e.clientX - cx
  const dy = e.clientY - cy
  const dist = Math.sqrt(dx * dx + dy * dy)
  const max  = 2.5
  eyeOffset.x = (dx / Math.max(dist, 1)) * max
  eyeOffset.y = (dy / Math.max(dist, 1)) * max
  const angle = Math.atan2(dy, dx) * (180 / Math.PI)
  headAngle.value = Math.max(-18, Math.min(18, angle * 0.25))
}

// ── Fortaleza ─────────────────────────────────────────
const fortaleza = computed(() => {
  const c = form.value.clave
  if (!c) return { pct: 0, color: '', texto: '' }
  let score = 0
  if (c.length >= 8)           score++
  if (/[A-Z]/.test(c))         score++
  if (/[0-9]/.test(c))         score++
  if (/[^A-Za-z0-9]/.test(c)) score++
  const map = [
    { pct: 25,  color: '#e63946', texto: 'Muy débil' },
    { pct: 50,  color: '#e07b39', texto: 'Débil' },
    { pct: 75,  color: '#d4a017', texto: 'Moderada' },
    { pct: 100, color: '#2d6a4f', texto: 'Fuerte' },
  ]
  return map[score - 1] || map[0]
})

// ── Datos ──────────────────────────────────────────────
async function cargarRoles() {
  const response = await api.get('/roles')
  roles.value = response.data
}

async function cargarUsuario() {
  const response = await usuariosService.getOne(route.params.id)
  const u = response.data
  form.value = {
    identificacion_usuario: u.identificacion_usuario,
    nombre_usuario:         u.nombre_usuario,
    apellido1_usuario:      u.apellido1_usuario,
    apellido2_usuario:      u.apellido2_usuario || '',
    correo:                 u.correo,
    clave:                  '',
    confirmarClave:         '',
    id_rol:                 u.id_rol,
  }
}

async function handleSubmit() {
  Object.keys(tocado).forEach(k => tocado[k] = true)
  if (!formularioValido.value) return

  error.value  = ''
  exito.value  = ''
  loading.value = true
  try {
    const data = { ...form.value }
    delete data.confirmarClave
    if (esEdicion.value && !data.clave) delete data.clave

    if (esEdicion.value) {
      await usuariosService.update(route.params.id, data)
      exito.value = 'Usuario actualizado correctamente.'
    } else {
      await usuariosService.create(data)
      exito.value = 'Usuario creado correctamente.'
      setTimeout(() => router.push('/usuarios'), 1500)
    }
  } catch (e) {
    error.value = e.response?.data?.message || 'Error al guardar el usuario.'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await cargarRoles()
  if (esEdicion.value) await cargarUsuario()
  window.addEventListener('mousemove', handleMouseMove)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>
<style scoped>
/* ── Fondo con degradado verde → turquesa ── */
.form-container {
  padding: 5rem 2rem 3rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #e8f5e9 0%, #e0f2f1 50%, #b2dfdb 100%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

/* ── Caja del formulario ── */
.form-box {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  max-width: 680px;
  width: 100%;
  overflow: visible;
  position: relative;
  animation: slideUp 0.4s ease both;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Header verde del panel ── */
.panel-header {
  background: var(--color-primary-dark);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  padding: 1.1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: visible;
}
.panel-header__titulo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-family: var(--font-base);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.3px;
}
.panel-header__titulo svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Botón volver */
.btn-volver {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.9rem;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: var(--radius-md);
  color: rgba(255,255,255,0.9);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-ui);
  transition: background 0.2s;
}
.btn-volver svg { width: 14px; height: 14px; }
.btn-volver:hover { background: rgba(255,255,255,0.25); }

/* ── Vaca sobre el header ── */
.vaca-panel {
  position: absolute;
  bottom: 60px;
  right: 24px;
  width: 95px;
  height: auto;
  filter: drop-shadow(0 3px 6px rgba(0,0,0,0.18));
  z-index: 20;
  pointer-events: none;
}

/* ── Formulario ── */
.form-body {
  padding: 2rem 2rem 1.5rem;
}

/* Secciones */
.seccion {
  margin-bottom: 1.8rem;
  animation: fadeInUp 0.4s ease both;
}
.seccion:nth-child(2) { animation-delay: 0.1s; }
.seccion:nth-child(3) { animation-delay: 0.2s; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.seccion__titulo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: var(--font-ui);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}
.seccion__titulo svg { width: 16px; height: 16px; flex-shrink: 0; }

/* Grupos y rows */
.form-group { margin-bottom: 1rem; }
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
}

/* Label */
.field-label {
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text-muted);
  font-family: var(--font-ui);
  transition: color 0.2s;
}
.campo-completo .field-label { color: var(--color-primary); }

/* Input wrap con ícono */
.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.input-icon {
  position: absolute;
  left: 0.75rem;
  width: 15px;
  height: 15px;
  color: var(--color-text-muted);
  pointer-events: none;
  flex-shrink: 0;
  transition: color 0.2s;
}
.campo-completo .input-icon { color: var(--color-primary); }

input, select {
  width: 100%;
  padding: 0.65rem 0.9rem 0.65rem 2.4rem;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  box-sizing: border-box;
  color: var(--color-text);
  background: var(--color-surface);
  font-family: var(--font-ui);
  transition: border-color 0.2s, box-shadow 0.2s;
}
input:focus, select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-pale);
}
input:disabled {
  background: var(--color-bg);
  color: var(--color-text-muted);
  cursor: not-allowed;
}
.campo-completo input,
.campo-completo select {
  border-color: var(--color-primary-light);
}

/* Select */
.select-wrap select { padding-right: 2rem; }

/* Toggle contraseña */
.toggle-clave {
  position: absolute;
  right: 0.7rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  padding: 0;
  display: flex;
  align-items: center;
  width: auto;
  box-shadow: none;
}
.toggle-clave svg { width: 16px; height: 16px; }
.toggle-clave:hover { color: var(--color-text); }

/* Fortaleza */
.fortaleza-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.4rem;
}
.fortaleza-barra {
  flex: 1;
  height: 4px;
  background: var(--color-border);
  border-radius: 99px;
  overflow: hidden;
}
.fortaleza-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.4s ease, background 0.4s ease;
}
.fortaleza-label {
  font-size: 0.72rem;
  font-weight: 600;
  font-family: var(--font-ui);
  white-space: nowrap;
}

/* Mensajes */
.msg-error, .msg-exito {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  text-align: center;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-md);
  margin-bottom: 0.8rem;
  font-family: var(--font-ui);
}
.msg-error svg, .msg-exito svg { width: 16px; height: 16px; flex-shrink: 0; }
.msg-error { color: var(--color-error); background: var(--color-error-pale); }
.msg-exito { color: var(--color-primary); background: var(--color-primary-pale); }

/* ── Validaciones ── */
.campo-error input,
.campo-error select {
  border-color: var(--color-error);
  background: var(--color-error-pale);
}
.campo-error input:focus,
.campo-error select:focus {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.15);
}
.campo-error .input-icon { color: var(--color-error); }
.campo-error .field-label { color: var(--color-error); }

.campo-msg-error {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.35rem;
  font-size: 0.75rem;
  color: var(--color-error);
  font-family: var(--font-ui);
  font-weight: 500;
  animation: fadeInUp 0.2s ease both;
}
.campo-msg-error svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.campo-msg-exito {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.35rem;
  font-size: 0.75rem;
  color: var(--color-primary);
  font-family: var(--font-ui);
  font-weight: 500;
  animation: fadeInUp 0.2s ease both;
}
.campo-msg-exito svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

/* Botón guardar */
.btn-guardar {
  width: 100%;
  padding: 0.8rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-ui);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  box-shadow: 0 4px 14px rgba(45, 106, 79, 0.3);
}
.btn-guardar svg { width: 18px; height: 18px; }
.btn-guardar:hover:not(:disabled) {
  background: var(--color-primary-dark);
  box-shadow: 0 6px 18px rgba(45, 106, 79, 0.4);
  transform: translateY(-1px);
}
.btn-guardar:disabled {
  background: var(--color-border);
  color: var(--color-text-muted);
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}
.spinner {
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ── Responsive ── */
@media (max-width: 600px) {
  /* Más espacio arriba para que la vaca quepa sin cortarse */
  .form-container { padding: 4.5rem 1rem 2.5rem; }
  .form-row { grid-template-columns: 1fr; }

  /* La vaca AHORA se muestra en móvil, un poco más pequeña */
  .vaca-panel {
    width: 72px;
    right: 14px;
    bottom: 62px;
  }
}
</style>