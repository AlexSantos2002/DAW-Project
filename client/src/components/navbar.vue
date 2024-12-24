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
      <button class="btn login-btn" @click="showLoginModal = true">Login</button>
      <button class="btn register-btn" @click="showRegisterModal = true">Registrar</button>
    </div>
<!-- Modal de Registro -->
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
          placeholder="Digite seu nome"
          required
        />
      </div>
      <div class="form-group">
        <label for="register-email">Email:</label>
        <input
          type="email"
          id="register-email"
          v-model="registerEmail"
          placeholder="Digite seu email"
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
        <button type="submit" class="btn register-modal-btn">Registrar</button>
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
          alert(data.message); // Mostra a mensagem de sucesso
          this.closeModal(); // Fecha o modal após login bem-sucedido
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
  }, // Fim correto do objeto methods
};
</script>

<style scoped>
/* Navbar Geral */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: #ecf0f1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Logo */
.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ecf0f1;
  text-decoration: none;
}

.logo a:hover {
  color: #1abc9c;
}

/* Links de Navegação */
.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #ecf0f1;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #1abc9c;
}

/* Botões de Login e Registro */
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
  background-color: #3498db;
  color: #fff;
}

.login-btn:hover {
  background-color: #2980b9;
}

/* Estilo do Botão de Registro */
.register-btn {
  background-color: #1abc9c;
  color: #fff;
}

.register-btn:hover {
  background-color: #16a085;
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
  background: #fff;
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
  background-color: #3498db; /* Azul */
  color: #fff;
}

.login-modal-btn:hover {
  background-color: #2980b9;
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
</style>
