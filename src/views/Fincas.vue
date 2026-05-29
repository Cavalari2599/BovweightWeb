<template>
    <div class="fincas">
        <div class="header">
            <h2>Fincas Registradas</h2>
        </div>

        <div class="buscador">
            <input
                v-model="buscar"
                type="text"
                placeholder="Buscar por nombre, ubicación o propietario..."
                @input="cargarFincas"
            />
        </div>

        <div class="tabla-container">
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
                    <tr v-for="finca in fincas" :key="finca.id_finca">
                        <td>{{ finca.id_finca }}</td>
                        <td>{{ finca.nombre_finca }}</td>
                        <td>{{ finca.ubicacion_finca }}</td>
                        <td>{{ finca.usuario?.nombre_usuario }} {{ finca.usuario?.apellido1_usuario }}</td>
                        <td>{{ finca.usuario?.correo }}</td>
                    </tr>
                    <tr v-if="fincas.length === 0">
                        <td colspan="5" class="sin-resultados">No se encontraron fincas.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fincasService } from '../services/fincas'

const fincas = ref([])
const buscar = ref('')

async function cargarFincas() {
    const response = await fincasService.getAll(buscar.value)
    fincas.value = response.data
}

onMounted(cargarFincas)
</script>

<style scoped>
.fincas {
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