import api from './api'

export const fincasService = {
    getAll(buscar = '') {
        return api.get('/fincas', { params: { buscar } })
    }
}