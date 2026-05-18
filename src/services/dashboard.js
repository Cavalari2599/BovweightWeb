import api from './api'

export const dashboardService = {
    getEstadisticas() {
        return api.get('/dashboard')
    }
}