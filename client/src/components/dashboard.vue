<template>
  <!-- Bloco do template: Estrutura visual do componente -->
  <div class="dashboard">
    <!-- Título da Dashboard -->
    <h1>Bem-vindo à sua Dashboard</h1>
    <p>Precisa de ajuda nutricional? Consulte os nossos especialistas abaixo!</p>

    <!-- Botões para navegação -->
    <div class="activity-buttons">
      <!-- Botão para redirecionar para "Minhas Atividades" -->
      <button @click="goToMyActivities" class="activity-button">Minhas Atividades</button>
      <!-- Botão para redirecionar para "Atividades em Grupo" -->
      <button @click="goToGroupActivities" class="activity-button">Atividades em Grupo</button>
    </div>

    <!-- Botão para exibir/esconder nutricionistas -->
    <button @click="toggleNutritionists" class="nutritionists-button">
      {{ showNutritionists ? "Esconder Nutricionistas" : "Ver Nutricionistas" }}
    </button>

    <!-- Bloco de nutricionistas: Exibido apenas se `showNutritionists` for true -->
    <div v-if="showNutritionists" class="nutritionists">
      <!-- Loop para listar os nutricionistas -->
      <div
        v-for="nutritionist in nutritionists"
        :key="nutritionist.id"
        class="nutritionist-card"
      >
        <!-- Informações de cada nutricionista -->
        <h2>{{ nutritionist.name }}</h2>
        <p><strong>Cidade:</strong> {{ nutritionist.address.city }}</p>
        <p><strong>Email:</strong> <a :href="'mailto:' + nutritionist.email">{{ nutritionist.email }}</a></p>
        <p><strong>Telemóvel:</strong> {{ nutritionist.phone }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Nome do componente
  name: "Dashboard",
  // Bloco de dados: Define as variáveis usadas no componente
  data() {
    return {
      showNutritionists: false, // Controle para mostrar ou esconder nutricionistas
      nutritionists: [], // Lista de nutricionistas
    };
  },
  // Bloco de métodos: Define as funções do componente
  methods: {
    // Função para alternar a exibição da lista de nutricionistas
    async toggleNutritionists() {
      if (!this.showNutritionists) {
        // Busca os dados apenas se a lista ainda não tiver sido carregada
        if (this.nutritionists.length === 0) {
          try {
            // Faz uma requisição para obter os dados de nutricionistas (simulados aqui)
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            this.nutritionists = await response.json();
          } catch (error) {
            console.error("Erro ao buscar nutricionistas:", error);
          }
        }
      }
      // Alterna a visibilidade da seção de nutricionistas
      this.showNutritionists = !this.showNutritionists;
    },
    // Função para redirecionar para a página "Minhas Atividades"
    goToMyActivities() {
      this.$router.push("/matividades");
    },
    // Função para redirecionar para a página "Atividades em Grupo"
    goToGroupActivities() {
      this.$router.push("/gatividades");
    },
  },
};
</script>

<style scoped>
/* Bloco de estilos: Estilização do componente */
/* Estilo geral da Dashboard */
.dashboard {
  text-align: center;
  padding: 2rem;
}

/* Botões de navegação */
.activity-buttons {
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.activity-button {
  background-color: #1abc9c;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.activity-button:hover {
  background-color: #16a085;
}

/* Botão para alternar a exibição dos nutricionistas */
.nutritionists-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 1rem 0;
}

.nutritionists-button:hover {
  background-color: #2980b9;
}

/* Estilo da lista de nutricionistas */
.nutritionists {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

/* Cartão de cada nutricionista */
.nutritionist-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  width: 300px;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nutritionist-card h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.nutritionist-card p {
  margin: 0.5rem 0;
}

.nutritionist-card a {
  color: #3498db;
  text-decoration: none;
}

.nutritionist-card a:hover {
  text-decoration: underline;
}
</style>
