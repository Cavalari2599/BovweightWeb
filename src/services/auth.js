import api from './api'

export function forgotPassword(correo) {
    return api.post('/auth/forgot-password', { correo })
}

export function resetPassword(correo, codigo, clave, clave_confirmation) {
    return api.post('/auth/reset-password', { correo, codigo, clave, clave_confirmation })
}