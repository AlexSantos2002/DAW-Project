<template>
  <nav class="navbar">
    <div class="logo">
      <a href="/">Fitness Hub</a>
    </div>
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/about">Sobre</a></li>
      <li><a href="/contact">Contato</a></li>
    </ul>
    <div class="auth-buttons">
  <template v-if="isLoggedIn">
    <span class="user-name">Bem-vindo!</span>
    <button class="btn logout-btn" @click="logout">Sair</button>
  </template>
  <template v-else>
    <button class="btn login-btn" @click="showLoginModal = true">Login</button>
    <button class="btn register-btn" @click="showRegisterModal = true">Registar</button>
  </template>
</div>

<!-- Modal de Registo -->
<div v-if="showRegisterModal" class="modal-overlay" @click.self="closeRegisterModal">
  <div class="modal-content">
    <h2>Registrar</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input
          type="text"
          id="name"
          v-model="registerName"
          placeholder="Digite o seu nome"
          required
        />
      </div>
      <div class="form-group">
        <label for="register-email">Email:</label>
        <input
          type="email"
          id="register-email"
          v-model="registerEmail"
          placeholder="Digite o seu email"
          required
        />
      </div>
      <div class="form-group">
        <label for="register-password">Senha:</label>
        <input
          type="password"
          id="register-password"
          v-model="registerPassword"
          placeholder="Digite sua senha"
          required
        />
      </div>
      <div class="form-group">
        <label for="register-type">Tipo:</label>
        <select id="register-type" v-model="registerType" required>
          <option value="cliente">Cliente</option>
          <option value="pt">Personal Trainer</option>
        </select>
      </div>
      <div class="popup-buttons">
        <button type="submit" class="btn register-modal-btn">Registar</button>
        <button type="button" class="btn cancel-modal-btn" @click="closeRegisterModal">Cancelar</button>
      </div>
    </form>
    <p v-if="registerErrorMessage" class="error-message">{{ registerErrorMessage }}</p>
  </div>
</div>

    <!-- Modal de Login -->
    <div v-if="showLoginModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Senha:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <div class="popup-buttons">
            <button type="submit" class="btn login-modal-btn">Entrar</button>
            <button type="button" class="btn cancel-modal-btn" @click="closeModal">Cancelar</button>
          </div>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: false, // Estado de login
      loggedInUserName: "", // Nome do usuário logado
      showLoginModal: false,
      showRegisterModal: false, // Adicionado para o modal de registro
      email: "",
      password: "",
      registerName: "",
      registerEmail: "",
      registerPassword: "",
      registerType: "cliente", // Padrão como cliente
      errorMessage: null,
      registerErrorMessage: null, // Mensagem de erro para o registro
    };
  },
  methods: {
    logout() {
  this.isLoggedIn = false;
  this.loggedInUserName = "";
  localStorage.removeItem("usuario_id"); // Remove o ID do usuário ao sair
  localStorage.removeItem("usuario_nome");
  this.$router.push("/"); // Redireciona para a página inicial
    },
    mounted() {
  const usuario_id = localStorage.getItem("usuario_id");
  const usuario_nome = localStorage.getItem("usuario_nome");

  if (usuario_id) {
    this.isLoggedIn = true;
    this.loggedInUserName = usuario_nome;

    // Redireciona para a Dashboard se já estiver logado
    this.$router.push("/dashboard");
  }
},
    closeModal() {
      this.showLoginModal = false;
      this.email = "";
      this.password = "";
      this.errorMessage = null;
    },
    closeRegisterModal() {
      this.showRegisterModal = false; // Fecha o modal de registro
      this.registerName = "";
      this.registerEmail = "";
      this.registerPassword = "";
      this.registerType = "cliente";
      this.registerErrorMessage = null;
    },
    async handleLogin() {
  try {
    const response = await fetch("http://localhost:8081/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: this.email, senha: this.password }),
    });

    if (response.ok) {
      const data = await response.json();
      this.isLoggedIn = true;
      this.loggedInUserName = data.nome; // Define o nome do usuário logado
      localStorage.setItem("usuario_id", data.usuario_id); // Salva o ID do usuário
      localStorage.setItem("usuario_nome", data.nome); // Salva o nome do usuário

      this.closeModal(); // Fecha o modal de login

      // Redireciona para a Dashboard
      this.$router.push("/dashboard");
    } else {
      const errorData = await response.json();
      this.errorMessage = errorData.message || "Erro no login.";
    }
  } catch (error) {
    this.errorMessage = "Erro ao conectar ao servidor.";
    console.error(error);
  }
   },
    async handleRegister() {
      try {
        const response = await fetch("http://localhost:8081/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: this.registerName,
            email: this.registerEmail,
            senha: this.registerPassword,
            tipo: this.registerType,
          }),
        });

        if (response.ok) {
          alert("Usuário registrado com sucesso!");
          this.closeRegisterModal();
        } else {
          const errorData = await response.json();
          this.registerErrorMessage = errorData.message || "Erro no registro.";
        }
      } catch (error) {
        this.registerErrorMessage = "Erro ao conectar ao servidor.";
        console.error(error);
      }
    },
  },
};
</script>


<style scoped>
/* Navbar Geral */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem;
  background-color: #212121;
  color: #ecf0f1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  position: sticky; /* Fixa a barra no topo da página */
  width: 100%;
  box-sizing: border-box;
  top: 0; /* Fixa no topo */
  left: 0; /* Fixa à esquerda */
}

/* Logo */
.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ecf0f1;
  text-decoration: none;
  padding:10px;
}

.logo a:hover {
  background-color: #B71C1C;
  color:black;
}

/* Links de Navegação */
.nav-links {
  list-style: none;
  display: flex;
  gap: 2.5rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #ecf0f1;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s;
  padding: 5px;
}

.nav-links a:hover {
  background-color: #B71C1C;
  color:black;
}

/* Botões de Login e Registo */
.auth-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

/* Estilo do Botão de Login */
.login-btn {
  background-color: #B71C1C;
  color: #fff;
}

.login-btn:hover {
  background-color: #FF1744;
}

/* Estilo do Botão de Registro */
.register-btn {
  background-color: #B71C1C;
  color: #fff;
}

.register-btn:hover {
  background-color: #FF1744;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal Content */
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.modal-content h2 {
  margin-bottom: 1rem;
  color: #333;
}

/* Form */
.form-group {
  margin-bottom: 1rem;
  text-align: left;
  color:black;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.popup-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

/* Estilo do Botão Entrar */
.login-modal-btn {
  background-color:#7CB342; 
  color: #fff;
}

.login-modal-btn:hover {
  background-color: #33691E;
}

/* Estilo do Botão Cancelar */
.cancel-modal-btn {
  background-color: #e74c3c; /* Vermelho */
  color: #fff;
}

.cancel-modal-btn:hover {
  background-color: #c0392b;
}

.error-message {
  color: #e74c3c;
  margin-top: 1rem;
}
/* Nome do usuário logado */
.user-name {
  margin-right: 10px;
  font-size: 1rem;
  color: #ecf0f1;
}

/* Botão de logout */
.logout-btn {
  background-color: #B71C1C;
  color: #fff;
}

.logout-btn:hover {
  background-color: #FF1744;
}

</style>
