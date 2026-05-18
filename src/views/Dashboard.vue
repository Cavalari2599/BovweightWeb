<template>
    <div class="layout">
        <Sidebar />
        <main class="contenido">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
</script>

<style scoped>
.layout {
    display: flex;
    min-height: 100vh;
}

.contenido {
    margin-left: 240px;
    flex: 1;
    padding: 2rem;
    background-color: #f0f4f8;
}
</style>