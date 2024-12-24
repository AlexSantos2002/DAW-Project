<template>
  <div id="app">
    <Navbar /> <!-- Adiciona a navbar -->
    <router-view /> <!-- Renderiza o conteúdo da rota atual -->
    <Footer /> <!-- Adiciona o footer -->
  </div>
</template>

<script>
import Navbar from "./components/navbar.vue";
import Footer from "./components/footer.vue"; // Importa o footer

export default {
  name: "App",
  components: {
    Navbar,
    Footer, // Declara o componente Footer
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  min-height: 100vh; /* Garante que o body ocupe a altura total da tela */
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Garante que o app ocupe a altura total */
}

router-view {
  flex: 1; /* Faz o conteúdo crescer e ocupar o espaço disponível */
}
</style>
