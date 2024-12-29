<template>
  <!-- Bloco do template: Estrutura visual do componente -->
  <div class="about-component">
    <!-- Título principal -->
    <h2>Sobre a Fitness Hub</h2>
    <!-- Descrição do propósito da Fitness Hub -->
    <p>
      Bem-vindo à Fitness Hub! Somos dedicados a fornecer as melhores soluções de fitness e nutrição 
      para ajudar-te a atingir os teus objetivos de saúde e bem-estar.
    </p>
    <!-- Informação adicional sobre a equipe -->
    <p>
      A nossa equipa é composta por especialistas apaixonados por ajudar-te a viver de forma mais saudável.
    </p>
  </div>
</template>

<script>
export default {
  // Bloco do script: Definição do componente
  name: "AboutComponent", // Nome do componente para identificação
};
</script>

<style scoped>
/* Bloco de estilo: Estilização do componente */
/* Estilo da div principal */
.about-component {
  text-align: center; /* Centraliza o conteúdo */
  margin-top: 2rem; /* Espaçamento superior */
}

/* Estilo do título */
.about-component h2 {
  font-size: 3.5rem; /* Tamanho da fonte */
  color: #2c3e50; /* Cor do texto */
  margin-bottom: 3rem; /* Espaçamento inferior */
}

/* Estilo dos parágrafos */
.about-component p {
  font-size: 1rem; /* Tamanho da fonte */
  color: #34495e; /* Cor do texto */
  line-height: 1.6; /* Altura da linha para melhorar a legibilidade */
}
</style>
