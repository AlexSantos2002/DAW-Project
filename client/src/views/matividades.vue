<template>
  <!-- Seção principal para as atividades do usuário -->
  <div class="my-activities">
    <!-- Cabeçalho com título e botão para voltar à Dashboard -->
    <div class="header">
      <h1>Minhas Atividades</h1>
      <button class="back-btn" @click="goToDashboard">Voltar à Dashboard</button>
    </div>

    <!-- Formulário para adicionar uma nova atividade -->
    <form @submit.prevent="addExercise" class="activity-form">
      <!-- Campo para o nome do exercício -->
      <input v-model="nome_exercicio" placeholder="Exercício" required />
      <!-- Campo para a data do exercício -->
      <input type="date" v-model="data" required />
      <!-- Campo para quilómetros (exibido apenas para corrida) -->
      <input
        v-if="isCorrida"
        v-model.number="quilometros"
        type="number"
        placeholder="Quilômetros"
        required
      />
      <!-- Campo para repetições (exibido para outros exercícios) -->
      <input
        v-else
        v-model.number="repeticoes"
        type="number"
        placeholder="Repetições"
        required
      />
      <!-- Botão para adicionar a atividade -->
      <button type="submit" class="add-btn">Adicionar</button>
    </form>

    <!-- Tabela para listar as atividades registradas -->
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
        <!-- Iteração para exibir cada atividade -->
        <tr v-for="exercicio in exercicios" :key="exercicio.id">
          <td>{{ exercicio.nome_exercicio }}</td>
          <td>{{ exercicio.data }}</td>
          <td>
            <!-- Exibe quilómetros se o exercício for uma corrida -->
            <span v-if="exercicio.nome_exercicio.toLowerCase() === 'corrida'">
              {{ exercicio.quilometros || '-' }}
            </span>
          </td>
          <td>
            <!-- Exibe repetições para outros tipos de exercícios -->
            <span v-if="exercicio.nome_exercicio.toLowerCase() !== 'corrida'">
              {{ exercicio.repeticoes || '-' }}
            </span>
          </td>
          <td>
            <!-- Botão para remover uma atividade -->
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
      nome_exercicio: "", // Nome do exercício a ser adicionado
      data: "", // Data do exercício
      quilometros: null, // Quilômetros percorridos (aplicável apenas para corrida)
      repeticoes: null, // Número de repetições (para outros exercícios)
      exercicios: [], // Lista de exercícios carregados
    };
  },
  computed: {
    // Computed para verificar se o exercício atual é uma corrida
    isCorrida() {
      return this.nome_exercicio.toLowerCase() === "corrida";
    },
  },
  methods: {
    // Método para adicionar uma nova atividade
    async addExercise() {
      try {
        const usuario_id = localStorage.getItem("usuario_id"); // Obtém o ID do usuário logado
        if (!usuario_id) {
          alert("Erro: Usuário não identificado.");
          return;
        }

        // Cria o payload para envio
        const payload = {
          usuario_id,
          nome_exercicio: this.nome_exercicio,
          data: this.data,
          quilometros: this.isCorrida ? this.quilometros : null,
          repeticoes: !this.isCorrida ? this.repeticoes : null,
        };

        // Envia o exercício para o backend
        const response = await axios.post("http://localhost:8081/exercicios", payload);
        this.exercicios.push(response.data); // Adiciona o novo exercício à lista

        // Reseta os campos do formulário
        this.nome_exercicio = "";
        this.data = "";
        this.quilometros = null;
        this.repeticoes = null;
      } catch (error) {
        console.error("Erro ao adicionar exercício:", error.response || error.message);
        alert("Erro ao adicionar exercício. Tente novamente.");
      }
    },
    // Método para carregar atividades do backend
    async loadExercises() {
      try {
        const usuario_id = localStorage.getItem("usuario_id");
        if (!usuario_id) {
          alert("Erro: Usuário não identificado.");
          return;
        }

        // Solicita as atividades do backend
        const response = await axios.get(
          `http://localhost:8081/exercicios?usuario_id=${usuario_id}`
        );
        this.exercicios = response.data; // Armazena as atividades no estado
      } catch (error) {
        console.error("Erro ao carregar exercícios:", error);
        alert("Erro ao carregar exercícios. Tente novamente.");
      }
    },
    // Método para remover uma atividade
    async removeExercise(id) {
      try {
        await axios.delete(`http://localhost:8081/exercicios/${id}`);
        this.exercicios = this.exercicios.filter((exercicio) => exercicio.id !== id);
      } catch (error) {
        console.error("Erro ao remover exercício:", error);
        alert("Erro ao remover exercício. Tente novamente.");
      }
    },
    // Redireciona para a dashboard
    goToDashboard() {
      this.$router.push("/dashboard");
    },
  },
  // Carrega as atividades ao montar o componente
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

/* Estilo da tabela */
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

/* Estilo do botão de remover */
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
