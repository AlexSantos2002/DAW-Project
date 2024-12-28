<template>
  <div class="my-activities">
    <div class="header">
      <h1>Minhas Atividades</h1>
      <button class="back-btn" @click="goToDashboard">Voltar à Dashboard</button>
    </div>
    <form @submit.prevent="addExercise" class="activity-form">
      <input v-model="nome_exercicio" placeholder="Exercício" required />
      <input type="date" v-model="data" required />
      <input
        v-if="isCorrida"
        v-model.number="quilometros"
        type="number"
        placeholder="Quilômetros"
        required
      />
      <input
        v-else
        v-model.number="repeticoes"
        type="number"
        placeholder="Repetições"
        required
      />
      <button type="submit" class="add-btn">Adicionar</button>
    </form>
    <table class="styled-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Data</th>
          <th>Quilômetros</th>
          <th>Repetições</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="exercicio in exercicios" :key="exercicio.id">
          <td>{{ exercicio.nome_exercicio }}</td>
          <td>{{ exercicio.data }}</td>
          <td>
            <span v-if="exercicio.nome_exercicio.toLowerCase() === 'corrida'">
              {{ exercicio.quilometros || '-' }}
            </span>
          </td>
          <td>
            <span v-if="exercicio.nome_exercicio.toLowerCase() !== 'corrida'">
              {{ exercicio.repeticoes || '-' }}
            </span>
          </td>
          <td>
            <button @click="removeExercise(exercicio.id)" class="remove-btn">Remover</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nome_exercicio: "",
      data: "",
      quilometros: null,
      repeticoes: null,
      exercicios: [],
      usuario_id: 1, // Substituir pelo ID do usuário logado dinamicamente
    };
  },
  computed: {
    isCorrida() {
      return this.nome_exercicio.toLowerCase() === "corrida";
    },
  },
  methods: {
    async addExercise() {
      try {
        const usuario_id = localStorage.getItem("usuario_id");
        if (!usuario_id) {
          alert("Erro: Usuário não identificado.");
          return;
        }

        const payload = {
          usuario_id,
          nome_exercicio: this.nome_exercicio,
          data: this.data,
          quilometros: this.isCorrida ? this.quilometros : null,
          repeticoes: !this.isCorrida ? this.repeticoes : null,
        };

        const response = await axios.post("http://localhost:8081/exercicios", payload);
        this.exercicios.push(response.data);

        this.nome_exercicio = "";
        this.data = "";
        this.quilometros = null;
        this.repeticoes = null;
      } catch (error) {
        console.error("Erro ao adicionar exercício:", error.response || error.message);
        alert("Erro ao adicionar exercício. Tente novamente.");
      }
    },
    async loadExercises() {
      try {
        const usuario_id = localStorage.getItem("usuario_id");
        if (!usuario_id) {
          alert("Erro: Usuário não identificado.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8081/exercicios?usuario_id=${usuario_id}`
        );
        this.exercicios = response.data;
      } catch (error) {
        console.error("Erro ao carregar exercícios:", error);
        alert("Erro ao carregar exercícios. Tente novamente.");
      }
    },
    async removeExercise(id) {
      try {
        await axios.delete(`http://localhost:8081/exercicios/${id}`);
        this.exercicios = this.exercicios.filter((exercicio) => exercicio.id !== id);
      } catch (error) {
        console.error("Erro ao remover exercício:", error);
        alert("Erro ao remover exercício. Tente novamente.");
      }
    },
    goToDashboard() {
      this.$router.push("/dashboard");
    },
  },
  mounted() {
    this.loadExercises();
  },
};
</script>

<style scoped>
/* Estilo da seção de atividades */
.my-activities {
  padding: 20px;
  text-align: center;
}

/* Estilo do cabeçalho */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-btn {
  background-color: #1abc9c;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #16a085;
}

/* Estilo do formulário */
.activity-form {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.activity-form input,
.activity-form button {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-btn {
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-btn:hover {
  background-color: #2980b9;
}

/* Estilo moderno da tabela */
.styled-table {
  margin: 20px auto;
  border-collapse: collapse;
  font-size: 1rem;
  min-width: 80%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
  background-color: #007bff;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  text-align: center;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}

.remove-btn {
  background-color: #e74c3c;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #c0392b;
}
</style>
