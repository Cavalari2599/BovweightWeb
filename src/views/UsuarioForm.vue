<template>
    <div class="form-container">
        <div class="form-box">
            <div class="form-header">
                <h2>{{ esEdicion ? 'Editar Usuario' : 'Nuevo Usuario' }}</h2>
                <button class="btn-volver" @click="router.push('/usuarios')">← Volver</button>
            </div>

            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label>Identificación</label>
                    <input
                        v-model="form.identificacion_usuario"
                        type="number"
                        placeholder="Número de cédula"
                        :disabled="esEdicion"
                        required
                    />
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Nombre</label>
                        <input
                            v-model="form.nombre_usuario"
                            type="text"
                            placeholder="Nombre"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label>Primer Apellido</label>
                        <input
                            v-model="form.apellido1_usuario"
                            type="text"
                            placeholder="Primer apellido"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label>Segundo Apellido</label>
                        <input
                            v-model="form.apellido2_usuario"
                            type="text"
                            placeholder="Segundo apellido"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label>Correo</label>
                    <input
                        v-model="form.correo"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        required
                    />
                </div>

                <div class="form-group">
                    <label>{{ esEdicion ? 'Nueva Contraseña (dejar vacío para no cambiar)' : 'Contraseña' }}</label>
                    <input
                        v-model="form.clave"
                        type="password"
                        placeholder="••••••••"
                        :required="!esEdicion"
                    />
                </div>

                <div class="form-group">
                    <label>Rol</label>
                    <select v-model="form.id_rol" required>
                        <option value="" disabled>Seleccione un rol</option>
                        <option v-for="rol in roles" :key="rol.id_rol" :value="rol.id_rol">
                            {{ rol.nombre_rol }}
                        </option>
                    </select>
                </div>

                <p v-if="error" class="error">{{ error }}</p>
                <p v-if="exito" class="exito">{{ exito }}</p>

                <button type="submit" :disabled="loading">
                    {{ loading ? 'Guardando...' : 'Guardar' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usuariosService } from '../services/usuarios'
import api from '../services/api'

const router = useRouter()
const route = useRoute()

const esEdicion = computed(() => !!route.params.id)

const form = ref({
    identificacion_usuario: '',
    nombre_usuario: '',
    apellido1_usuario: '',
    apellido2_usuario: '',
    correo: '',
    clave: '',
    id_rol: '',
})

const roles = ref([])
const error = ref('')
const exito = ref('')
const loading = ref(false)

async function cargarRoles() {
    const response = await api.get('/roles')
    roles.value = response.data
}

async function cargarUsuario() {
    const response = await usuariosService.getOne(route.params.id)
    const u = response.data
    form.value = {
        identificacion_usuario: u.identificacion_usuario,
        nombre_usuario: u.nombre_usuario,
        apellido1_usuario: u.apellido1_usuario,
        apellido2_usuario: u.apellido2_usuario || '',
        correo: u.correo,
        clave: '',
        id_rol: u.id_rol,
    }
}

async function handleSubmit() {
    error.value = ''
    exito.value = ''
    loading.value = true

    try {
        const data = { ...form.value }
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
})
</script>

<style scoped>
.form-container {
    padding: 2rem;
}

.form-box {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    max-width: 700px;
    margin: 0 auto;
}

.form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

h2 {
    margin: 0;
    color: #2d6a4f;
}

.form-group {
    margin-bottom: 1rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
}

label {
    display: block;
    margin-bottom: 0.25rem;
    color: #333;
    font-size: 0.9rem;
}

input, select {
    width: 100%;
    padding: 0.65rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    box-sizing: border-box;
}

input:focus, select:focus {
    outline: none;
    border-color: #2d6a4f;
}

input:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
}

button[type="submit"] {
    width: 100%;
    padding: 0.75rem;
    background-color: #2d6a4f;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 0.5rem;
}

button[type="submit"]:hover {
    background-color: #1b4332;
}

button[type="submit"]:disabled {
    background-color: #aaa;
    cursor: not-allowed;
}

.btn-volver {
    padding: 0.4rem 1rem;
    background-color: #f0f0f0;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: #333;
}

.btn-volver:hover {
    background-color: #ddd;
}

.error {
    color: red;
    font-size: 0.85rem;
    text-align: center;
}

.exito {
    color: #2d6a4f;
    font-size: 0.85rem;
    text-align: center;
}
</style>