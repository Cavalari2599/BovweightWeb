import api from './api'

export const historialService = {
    getAll(buscar = '') {
        return api.get('/historial', { params: { buscar } })
    }
}