<template>
    <div class="login-container">
        <div class="login-box">
            <h1>BovWeight CR</h1>
            <h2>Recuperar Contraseña</h2>

            <form v-if="!success" @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label>Correo</label>
                    <input
                        v-model="correo"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        required
                    />
                </div>

                <p v-if="error" class="error">{{ error }}</p>

                <button type="submit" :disabled="loading">
                    {{ loading ? 'Enviando...' : 'Enviar enlace' }}
                </button>
            </form>

            <p v-if="success" class="success">
                Se ha enviado un enlace de recuperación a tu correo.
            </p>

            <div class="link-container">
                <RouterLink to="/login">Volver al login</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { forgotPassword } from '../services/auth'

const correo = ref('')
const error = ref('')
const loading = ref(false)
const success = ref(false)

async function handleSubmit() {
    error.value = ''
    loading.value = true
    try {
        await forgotPassword(correo.value)
        success.value = true
    } catch (e) {
        error.value = e.response?.data?.message || 'No se encontró ninguna cuenta con ese correo.'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f4f8;
}

.login-box {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 400px;
}

h1 {
    color: #2d6a4f;
    text-align: center;
    margin-bottom: 0.25rem;
}

h2 {
    text-align: center;
    color: #555;
    font-size: 1rem;
    margin-bottom: 1.5rem;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.25rem;
    color: #333;
    font-size: 0.9rem;
}

input {
    width: 100%;
    padding: 0.65rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    box-sizing: border-box;
}

input:focus {
    outline: none;
    border-color: #2d6a4f;
}

button {
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

button:hover {
    background-color: #1b4332;
}

button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
}

.error {
    color: red;
    font-size: 0.85rem;
    text-align: center;
}

.success {
    color: #2d6a4f;
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 1rem;
}

.link-container {
    text-align: center;
    margin-top: 1rem;
}

.link-container a {
    color: #2d6a4f;
    font-size: 0.85rem;
    text-decoration: none;
}

.link-container a:hover {
    text-decoration: underline;
}
</style>
