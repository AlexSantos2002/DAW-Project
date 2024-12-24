<template>
  <div id="app">
    <Navbar /> <!-- Navbar no topo -->
    <router-view /> <!-- Conteúdo dinâmico das rotas -->
    <Footer /> <!-- Footer fixo ao fim da página -->
  </div>
</template>

<script>
import Navbar from "./components/navbar.vue";
import Footer from "./components/footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

router-view {
  flex: 1; /* Faz o conteúdo crescer e ocupar o espaço disponível */
}

footer {
  margin-top: auto; /* Posiciona o footer no fim da página */
}
</style>
