<template>
  <!-- Estrutura principal da página de Contato -->
  <div class="contact-page">
    <!-- Inclui o componente ContactComponent que contém o formulário de contato e informações -->
    <ContactComponent />
  </div>
</template>

<script>
  // Importa o componente ContactComponent que será usado para exibir a seção de contato
  import ContactComponent from "../components/contact.vue";

  export default {
    // Nome do componente principal
    name: "ContactPage",
    // Registra o ContactComponent para ser usado no template
    components: {
      ContactComponent,
    },
  };
</script>

<style scoped>
  /* Estilização da página de Contato */
  .contact-page {
    /* Define o espaçamento interno para a página */
    padding: 2rem;
  }
</style>
