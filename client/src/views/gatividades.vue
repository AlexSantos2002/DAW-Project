<template>
  <!-- Estrutura principal da página de Atividades em Grupo -->
  <div class="group-activities">
    <!-- Botão para voltar para a dashboard -->
    <button @click="goToDashboard" class="dashboard-btn">Voltar à Dashboard</button>

    <!-- Título da página -->
    <h1>Atividades em Grupo</h1>

    <!-- Formulário para criar um grupo -->
    <form @submit.prevent="createGroup" class="group-form">
      <!-- Campo para o nome do grupo -->
      <input
        v-model="groupName"
        type="text"
        placeholder="Nome do Grupo"
        required
      />
      <!-- Campo para a descrição do grupo (opcional) -->
      <input
        v-model="groupDescription"
        type="text"
        placeholder="Descrição do Grupo (opcional)"
      />
      <!-- Botão para criar o grupo -->
      <button type="submit" class="create-btn">Criar Grupo</button>
    </form>

    <!-- Formulário para entrar em um grupo existente -->
    <form @submit.prevent="joinGroup" class="group-form">
      <!-- Campo para o nome do grupo -->
      <input
        v-model="groupToJoin"
        type="text"
        placeholder="Nome do Grupo para Entrar"
        required
      />
      <!-- Botão para entrar no grupo -->
      <button type="submit" class="join-btn">Entrar no Grupo</button>
    </form>

    <!-- Lista de grupos criados -->
    <div v-if="groups.length > 0" class="group-list">
      <h2>Grupos Criados</h2>
      <table class="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <!-- Itera sobre a lista de grupos para exibi-los -->
          <tr v-for="group in groups" :key="group.id">
            <td>{{ group.id }}</td>
            <td>{{ group.nome }}</td>
            <td>{{ group.descricao || "Sem descrição" }}</td>
            <td>
              <!-- Botão para remover o grupo -->
              <button @click="removeGroup(group.id)" class="remove-btn">Remover</button>
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
  data() {
    return {
      groupName: "", // Nome do grupo a ser criado
      groupDescription: "", // Descrição do grupo a ser criado
      groupToJoin: "", // Nome do grupo para entrar
      groups: [], // Lista de grupos carregados do backend
    };
  },
  methods: {
    // Método para criar um grupo
    async createGroup() {
      try {
        const response = await axios.post("http://localhost:8081/grupos", {
          nome: this.groupName,
          descricao: this.groupDescription,
        });

        alert("Grupo criado com sucesso!");
        this.groups.push(response.data); // Adiciona o novo grupo à lista
        this.groupName = "";
        this.groupDescription = "";
      } catch (error) {
        console.error("Erro ao criar grupo:", error.response || error.message);
        alert("Erro ao criar grupo. Tente novamente.");
      }
    },
    // Método para entrar em um grupo existente
    async joinGroup() {
      try {
        const usuario_id = localStorage.getItem("usuario_id");
        if (!usuario_id) {
          alert("Erro: Usuário não identificado.");
          return;
        }

        const response = await axios.post("http://localhost:8081/grupos/entrar", {
          nome: this.groupToJoin,
          usuario_id,
        });
        alert(response.data.message || "Você entrou no grupo com sucesso!");
        this.groupToJoin = ""; // Limpa o campo após o sucesso
        this.loadGroups(); // Atualiza a lista de grupos
      } catch (error) {
        console.error("Erro ao entrar no grupo:", error.response || error.message);
        alert(error.response?.data?.message || "Erro ao entrar no grupo. Tente novamente.");
      }
    },
    // Método para carregar a lista de grupos do backend
    async loadGroups() {
      try {
        const response = await axios.get("http://localhost:8081/grupos");
        this.groups = response.data;
      } catch (error) {
        console.error("Erro ao carregar grupos:", error.response || error.message);
        alert("Erro ao carregar grupos. Tente novamente.");
      }
    },
    // Método para remover um grupo
    async removeGroup(id) {
      try {
        await axios.delete(`http://localhost:8081/grupos/${id}`);
        this.groups = this.groups.filter((group) => group.id !== id); // Atualiza a lista
        alert("Grupo removido com sucesso!");
      } catch (error) {
        console.error("Erro ao remover grupo:", error.response || error.message);
        alert("Erro ao remover grupo. Tente novamente.");
      }
    },
    // Método para redirecionar para a dashboard
    goToDashboard() {
      this.$router.push("/dashboard");
    },
  },
  // Carrega a lista de grupos ao montar o componente
  mounted() {
    this.loadGroups();
  },
};
</script>

<style scoped>
/* Estilização geral da página */
.group-activities {
  padding: 2rem;
  text-align: center;
}

/* Botão de voltar à dashboard */
.dashboard-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
}

.dashboard-btn:hover {
  background-color: #45a049;
}

/* Estilo dos formulários */
.group-form {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 2rem;
}

.group-form input,
.group-form button {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Botão de criar grupo */
.create-btn {
  background-color: #1abc9c;
  color: #fff;
  border: none;
  cursor: pointer;
}

.create-btn:hover {
  background-color: #16a085;
}

/* Botão de entrar no grupo */
.join-btn {
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
}

.join-btn:hover {
  background-color: #2980b9;
}

/* Lista de grupos */
.group-list {
  margin-top: 2rem;
}

.styled-table {
  margin: 0 auto;
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

/* Botão de remover grupo */
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
