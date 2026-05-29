<template>
    <div class="historial">
        <div class="header">
            <h2>Historial de Acciones</h2>
        </div>

        <div class="buscador">
            <input
                v-model="buscar"
                type="text"
                placeholder="Buscar por usuario, acción o tabla..."
                @input="cargarHistorial"
            />
        </div>

        <div class="tabla-container">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Usuario</th>
                        <th>Acción</th>
                        <th>Tabla</th>
                        <th>Registro</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in historial" :key="item.id_historial">
                        <td>{{ item.id_historial }}</td>
                        <td>{{ item.usuario?.nombre_usuario }} {{ item.usuario?.apellido1_usuario }}</td>
                        <td>{{ item.accion }}</td>
                        <td>{{ item.tabla_afectada || '-' }}</td>
                        <td>{{ item.id_registro || '-' }}</td>
                        <td>{{ formatFecha(item.fecha_accion) }}</td>
                    </tr>
                    <tr v-if="historial.length === 0">
                        <td colspan="6" class="sin-resultados">No se encontraron registros.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { historialService } from '../services/historial'

const historial = ref([])
const buscar = ref('')

async function cargarHistorial() {
    const response = await historialService.getAll(buscar.value)
    historial.value = response.data
}

function formatFecha(fecha) {
    if (!fecha) return '-'
    return new Date(fecha).toLocaleString('es-CR')
}

onMounted(cargarHistorial)
</script>

<style scoped>
.historial {
    padding: 2rem;
}

.header {
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

.sin-resultados {
    text-align: center;
    color: #aaa;
    padding: 2rem;
}
</style>