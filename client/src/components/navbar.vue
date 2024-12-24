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
        <button class="btn login-btn" @click="login">Login</button>
        <button class="btn register-btn" @click="register">Registrar</button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar",
    methods: {
      login() {
        alert("Função de Login aqui!");
      },
      register() {
        alert("Função de Registro aqui!");
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
    padding: 1rem 2rem;
    background-color: #2c3e50; /* Cor de fundo */
    color: #ecf0f1; /* Cor do texto */
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
    color: #1abc9c; /* Cor de destaque ao passar o mouse */
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
    color: #1abc9c; /* Cor de destaque ao passar o mouse */
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
    background-color: #3498db; /* Azul */
    color: #fff;
  }
  
  .login-btn:hover {
    background-color: #2980b9; /* Azul mais escuro */
    transform: scale(1.05);
  }
  
  /* Estilo do Botão de Registro */
  .register-btn {
    background-color: #1abc9c; /* Verde */
    color: #fff;
  }
  
  .register-btn:hover {
    background-color: #16a085; /* Verde mais escuro */
    transform: scale(1.05);
  }
  </style>
  