<template>
  <!-- Estrutura principal da página da Dashboard -->
  <div>
    <!-- Inclui o componente DashboardComponent -->
    <dashboard-component />
  </div>
</template>

<script>
  // Importa o componente DashboardComponent para exibir a seção principal da dashboard
  import DashboardComponent from "../components/dashboard.vue";

  export default {
    // Nome do componente principal da visualização da Dashboard
    name: "DashboardView",
    // Registra o DashboardComponent como um componente utilizável no template
    components: {
      DashboardComponent,
    },
  };
</script>
