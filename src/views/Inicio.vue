<template>
    <div class="inicio">
        <h2>Panel de Control</h2>

        <div v-if="loading" class="cargando">Cargando estadísticas...</div>

        <div v-else class="estadisticas">
            <div class="seccion">
                <h3>Usuarios</h3>
                <div class="cards">
                    <div class="card verde">
                        <span class="numero">{{ stats.usuarios_activos }}</span>
                        <span class="label">Activos</span>
                    </div>
                    <div class="card rojo">
                        <span class="numero">{{ stats.usuarios_inactivos }}</span>
                        <span class="label">Inactivos</span>
                    </div>
                </div>
            </div>

            <div class="seccion">
                <h3>Usuarios por Rol</h3>
                <div class="cards">
                    <div class="card azul">
                        <span class="numero">{{ stats.usuarios_por_rol?.ganaderos }}</span>
                        <span class="label">Ganaderos</span>
                    </div>
                    <div class="card azul">
                        <span class="numero">{{ stats.usuarios_por_rol?.veterinarios }}</span>
                        <span class="label">Veterinarios</span>
                    </div>
                    <div class="card azul">
                        <span class="numero">{{ stats.usuarios_por_rol?.ayudantes }}</span>
                        <span class="label">Ayudantes</span>
                    </div>
                    <div class="card azul">
                        <span class="numero">{{ stats.usuarios_por_rol?.tecnicos }}</span>
                        <span class="label">Técnicos</span>
                    </div>
                </div>
            </div>

            <div class="seccion">
                <h3>Sistema</h3>
                <div class="cards">
                    <div class="card verde">
                        <span class="numero">{{ stats.total_fincas }}</span>
                        <span class="label">Fincas</span>
                    </div>
                    <div class="card verde">
                        <span class="numero">{{ stats.total_animales }}</span>
                        <span class="label">Animales</span>
                    </div>
                    <div class="card verde">
                        <span class="numero">{{ stats.total_pesajes }}</span>
                        <span class="label">Pesajes</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { dashboardService } from '../services/dashboard'

const stats = ref({})
const loading = ref(true)

async function cargarEstadisticas() {
    try {
        const response = await dashboardService.getEstadisticas()
        stats.value = response.data
    } finally {
        loading.value = false
    }
}

onMounted(cargarEstadisticas)
</script>

<style scoped>
.inicio {
    padding: 2rem;
}

h2 {
    color: #2d6a4f;
    margin-bottom: 2rem;
}

h3 {
    color: #444;
    margin-bottom: 1rem;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.seccion {
    margin-bottom: 2rem;
}

.cards {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    min-width: 130px;
    border-top: 4px solid transparent;
}

.card.verde {
    border-top-color: #2d6a4f;
}

.card.rojo {
    border-top-color: #e63946;
}

.card.azul {
    border-top-color: #457b9d;
}

.numero {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
}

.label {
    font-size: 0.85rem;
    color: #888;
    margin-top: 0.25rem;
}

.cargando {
    color: #888;
    font-size: 1rem;
}
</style>