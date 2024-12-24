<template>
    <div class="dashboard">
      <h1>Bem-vindo à sua Dashboard</h1>
      <p>Precisa de ajuda nutricional? Consulte os nossos especialistas abaixo!</p>
      <button @click="toggleNutritionists" class="nutritionists-button">
        {{ showNutritionists ? "Esconder Nutricionistas" : "Ver Nutricionistas" }}
      </button>
  
      <!-- Exibe os nutricionistas apenas se showNutritionists for true -->
      <div v-if="showNutritionists" class="nutritionists">
        <div
          v-for="nutritionist in nutritionists"
          :key="nutritionist.id"
          class="nutritionist-card"
        >
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
    name: "Dashboard",
    data() {
      return {
        showNutritionists: false, // Controle para mostrar ou esconder nutricionistas
        nutritionists: [], // Lista de nutricionistas
      };
    },
    methods: {
      async toggleNutritionists() {
        if (!this.showNutritionists) {
          // Apenas busca dados se ainda não estiverem carregados
          if (this.nutritionists.length === 0) {
            try {
              const response = await fetch("https://jsonplaceholder.typicode.com/users");
              this.nutritionists = await response.json();
            } catch (error) {
              console.error("Erro ao buscar nutricionistas:", error);
            }
          }
        }
        // Alterna a exibição
        this.showNutritionists = !this.showNutritionists;
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    text-align: center;
    padding: 2rem;
  }
  
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
  
  .nutritionists {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
  }
  
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
  