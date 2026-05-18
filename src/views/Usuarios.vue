<template>
    <div class="usuarios">
        <div class="header">
            <h2>Gestión de Usuarios</h2>
            <button class="btn-crear" @click="irACrear">+ Nuevo Usuario</button>
        </div>

        <div class="buscador">
            <input
                v-model="buscar"
                type="text"
                placeholder="Buscar por nombre, correo o identificación..."
                @input="buscarUsuarios"
            />
        </div>

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
                        <td>{{ usuario.identificacion_usuario }}</td>
                        <td>{{ usuario.nombre_usuario }} {{ usuario.apellido1_usuario }} {{ usuario.apellido2_usuario }}</td>
                        <td>{{ usuario.correo }}</td>
                        <td>{{ usuario.rol?.nombre_rol }}</td>
                        <td>
                            <span :class="usuario.estado ? 'activo' : 'inactivo'">
                                {{ usuario.estado ? 'Activo' : 'Inactivo' }}
                            </span>
                        </td>
                        <td class="acciones">
                            <button class="btn-editar" @click="irAEditar(usuario.identificacion_usuario)">Editar</button>
                            <button
                                :class="usuario.estado ? 'btn-desactivar' : 'btn-activar'"
                                @click="cambiarEstado(usuario)"
                            >
                                {{ usuario.estado ? 'Desactivar' : 'Activar' }}
                            </button>
                        </td>
                    </tr>
                    <tr v-if="usuarios.length === 0">
                        <td colspan="6" class="sin-resultados">No se encontraron usuarios.</td>
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

const router = useRouter()
const usuarios = ref([])
const buscar = ref('')

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
    padding: 2rem;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

h2 {
    margin: 0;
    color: #2d6a4f;
}

.buscador input {
    width: 100%;
    padding: 0.65rem 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    margin-bottom: 1rem;
    box-sizing: border-box;
}

.tabla-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

thead {
    background-color: #2d6a4f;
    color: white;
}

th, td {
    padding: 0.85rem 1rem;
    text-align: left;
    font-size: 0.9rem;
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

tbody tr:hover {
    background-color: #f0f4f8;
}

.activo {
    color: #2d6a4f;
    font-weight: bold;
}

.inactivo {
    color: #e63946;
    font-weight: bold;
}

.acciones {
    display: flex;
    gap: 0.5rem;
}

.btn-crear {
    padding: 0.5rem 1.2rem;
    background-color: #2d6a4f;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;
}

.btn-crear:hover {
    background-color: #1b4332;
}

.btn-editar {
    padding: 0.4rem 0.8rem;
    background-color: #457b9d;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.btn-desactivar {
    padding: 0.4rem 0.8rem;
    background-color: #e63946;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.btn-activar {
    padding: 0.4rem 0.8rem;
    background-color: #2d6a4f;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.sin-resultados {
    text-align: center;
    color: #aaa;
    padding: 2rem;
}
</style>