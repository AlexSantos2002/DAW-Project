<template>
  <div id="app">
    <Navbar /> <!-- Adiciona a barra de navegação -->
    <router-view /> <!-- Renderiza o conteúdo da rota atual -->
  </div>
</template>

<script>
import Navbar from "./components/navbar.vue"; // Importa o componente Navbar

export default {
  name: "App",
  components: {
    Navbar, // Declara o componente Navbar
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
