<template>
  <div class="group-activities">
    <h1>Atividades em Grupo</h1>

    <!-- Formulário para criar grupo -->
    <form @submit.prevent="createGroup" class="group-form">
      <input
        v-model="nome"
        type="text"
        placeholder="Nome do Grupo"
        required
      />
      <input
        v-model="descricao"
        type="text"
        placeholder="Descrição do Grupo (opcional)"
      />
      <button type="submit" class="create-btn">Criar Grupo</button>
    </form>

    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Lista de grupos -->
    <div v-if="grupos.length > 0" class="group-list">
      <h2>Grupos Criados</h2>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="grupo in grupos" :key="grupo.id">
            <td>{{ grupo.nome }}</td>
            <td>{{ grupo.descricao || "Sem descrição" }}</td>
            <td>
              <button @click="removeGroup(grupo.id)" class="remove-btn">
                Remover
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GroupActivities",
  data() {
    return {
      nome: "", // Nome do grupo
      descricao: "", // Descrição do grupo
      grupos: [], // Lista de grupos
      successMessage: null, // Mensagem de sucesso
      errorMessage: null, // Mensagem de erro
    };
  },
  methods: {
    async createGroup() {
      try {
        const payload = {
          nome: this.nome,
          descricao: this.descricao,
        };

        const response = await axios.post("http://localhost:8081/grupos", payload);
        this.successMessage = "Grupo criado com sucesso!";
        this.errorMessage = null;

        // Adiciona o grupo recém-criado à lista
        this.grupos.push({
          id: response.data.id,
          nome: this.nome,
          descricao: this.descricao,
        });

        // Limpa os campos do formulário
        this.nome = "";
        this.descricao = "";
      } catch (error) {
        this.successMessage = null;
        this.errorMessage = error.response?.data || "Erro ao criar o grupo.";
        console.error("Erro ao criar grupo:", error);
      }
    },
    async fetchGroups() {
      try {
        const response = await axios.get("http://localhost:8081/grupos");
        this.grupos = response.data;
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      }
    },
    async removeGroup(id) {
      try {
        await axios.delete(`http://localhost:8081/grupos/${id}`);
        this.successMessage = "Grupo removido com sucesso!";
        this.errorMessage = null;

        // Remove o grupo da lista localmente
        this.grupos = this.grupos.filter((grupo) => grupo.id !== id);
      } catch (error) {
        this.successMessage = null;
        this.errorMessage = error.response?.data || "Erro ao remover o grupo.";
        console.error("Erro ao remover grupo:", error);
      }
    },
  },
  mounted() {
    this.fetchGroups();
  },
};
</script>

<style scoped>
.group-activities {
  text-align: center;
  padding: 2rem;
}

.group-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.group-form input {
  padding: 10px;
  width: 80%;
  max-width: 400px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.group-form button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #1abc9c;
  color: white;
  cursor: pointer;
}

.group-form button:hover {
  background-color: #16a085;
}

.success-message {
  color: #1abc9c;
  font-weight: bold;
}

.error-message {
  color: #e74c3c;
  font-weight: bold;
}

.group-list table {
  width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
}

.styled-table th,
.styled-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.styled-table th {
  background-color: #007bff;
  color: white;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}

.remove-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #c0392b;
}
</style>
