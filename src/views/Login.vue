<template>
    <div class="login-container">
        <div class="login-box">
            <h1>BovWeight CR</h1>
            <h2>Iniciar Sesión</h2>

            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label>Correo</label>
                    <input
                        v-model="correo"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        required
                    />
                </div>

                <div class="form-group">
                    <label>Contraseña</label>
                    <input
                        v-model="clave"
                        type="password"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <p v-if="error" class="error">{{ error }}</p>

                <button type="submit" :disabled="loading">
                    {{ loading ? 'Ingresando...' : 'Ingresar' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const correo = ref('')
const clave = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
    error.value = ''
    loading.value = true
    try {
        await auth.login(correo.value, clave.value)
        router.push('/dashboard')
    } catch (e) {
        error.value = e.response?.data?.message || 'Error al iniciar sesión.'
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
</style>