import api from './api'

export const usuariosService = {
    getAll(buscar = '') {
        return api.get('/usuarios', { params: { buscar } })
    },

    getOne(id) {
        return api.get(`/usuarios/${id}`)
    },

    create(data) {
        return api.post('/usuarios', data)
    },

    update(id, data) {
        return api.put(`/usuarios/${id}`, data)
    },

    toggleEstado(id) {
        return api.patch(`/usuarios/${id}/estado`)
    }
}