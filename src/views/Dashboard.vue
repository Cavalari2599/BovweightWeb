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
  margin-left: 265px;
  flex: 1;
  min-height: 100vh;
  background-color: var(--color-bg);
  padding: 0;
}
</style>