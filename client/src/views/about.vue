<template>
  <!-- Estrutura principal da página de Sobre -->
  <div class="about-view">
    <!-- Inclui o componente AboutComponent, que contém as informações da página Sobre -->
    <AboutComponent />
  </div>
</template>

<script>
  // Importa o componente AboutComponent para exibir informações sobre o Fitness Hub
  import AboutComponent from "../components/about.vue";

  export default {
    // Define o nome do componente pai como AboutView
    name: "AboutView",
    // Registra o AboutComponent como um componente filho
    components: {
      AboutComponent,
    },
  };
</script>

<style scoped>
  /* Estilização da página AboutView */
  .about-view {
    /* Define o layout da página para centralizar os elementos */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* Garante que a altura mínima da visualização seja 80% da altura da janela */
    min-height: 80vh;
  }
</style>
