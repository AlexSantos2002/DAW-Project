<template>
  <!-- Estrutura principal do aplicativo -->
  <div id="app">
    <!-- Navbar fixa no topo da página -->
    <Navbar />
    <!-- Área dinâmica onde as rotas são renderizadas -->
    <router-view />
    <!-- Footer fixo no final da página -->
    <Footer />
  </div>
</template>

<script>
  // Importa os componentes Navbar e Footer
  import Navbar from "./components/navbar.vue";
  import Footer from "./components/footer.vue";

  export default {
    // Nome do componente principal da aplicação
    name: "App",
    // Registra os componentes Navbar e Footer para uso no template
    components: {
      Navbar,
      Footer,
    },
  };
</script>

<style>
/* Estilização do corpo da página */
body {
  margin: 0; /* Remove margens padrão */
  font-family: Arial, sans-serif; /* Define a fonte padrão */
  min-height: 100vh; /* Define a altura mínima como 100% da altura da tela */
  display: flex; /* Configura um layout flexível */
  flex-direction: column; /* Garante que os elementos sejam exibidos em coluna */
}

/* Estilização do contêiner principal */
#app {
  display: flex; /* Configura o layout flexível */
  flex-direction: column; /* Exibe os elementos em coluna */
  min-height: 100vh; /* Garante que o contêiner ocupe toda a altura da tela */
}

/* Estilização da área dinâmica de rotas */
router-view {
  flex: 1; /* Faz a área de conteúdo crescer para ocupar o espaço disponível */
}

/* Estilização do footer */
footer {
  margin-top: auto; /* Garante que o footer fique fixado no final da página */
}
</style>
