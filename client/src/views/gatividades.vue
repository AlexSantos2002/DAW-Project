<template>
  <div class="group-activities">
    <h1>Atividades em Grupo</h1>
    <form @submit.prevent="createGroup" class="group-form">
      <input
        v-model="groupName"
        type="text"
        placeholder="Nome do Grupo"
        required
      />
      <input
        v-model="groupDescription"
        type="text"
        placeholder="Descrição do Grupo (opcional)"
      />
      <button type="submit" class="create-btn">Criar Grupo</button>
    </form>

    <form @submit.prevent="joinGroup" class="group-form">
      <input
        v-model="groupToJoin"
        type="text"
        placeholder="Nome do Grupo para Entrar"
        required
      />
      <button type="submit" class="join-btn">Entrar no Grupo</button>
    </form>

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
          <tr v-for="group in groups" :key="group.id">
            <td>{{ group.id }}</td>
            <td>{{ group.nome }}</td>
            <td>{{ group.descricao || "Sem descrição" }}</td>
            <td>
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
      groupName: "",
      groupDescription: "",
      groupToJoin: "",
      groups: [],
    };
  },
  methods: {
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
    async loadGroups() {
      try {
        const response = await axios.get("http://localhost:8081/grupos");
        this.groups = response.data;
      } catch (error) {
        console.error("Erro ao carregar grupos:", error.response || error.message);
        alert("Erro ao carregar grupos. Tente novamente.");
      }
    },
    async removeGroup(id) {
      try {
        await axios.delete(`http://localhost:8081/grupos/${id}`);
        this.groups = this.groups.filter((group) => group.id !== id);
        alert("Grupo removido com sucesso!");
      } catch (error) {
        console.error("Erro ao remover grupo:", error.response || error.message);
        alert("Erro ao remover grupo. Tente novamente.");
      }
    },
  },
  mounted() {
    this.loadGroups(); // Carrega os grupos ao montar o componente
  },
};
</script>

<style scoped>
.group-activities {
  padding: 2rem;
  text-align: center;
}

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

.create-btn {
  background-color: #1abc9c;
  color: #fff;
  border: none;
  cursor: pointer;
}

.create-btn:hover {
  background-color: #16a085;
}

.join-btn {
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
}

.join-btn:hover {
  background-color: #2980b9;
}

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
