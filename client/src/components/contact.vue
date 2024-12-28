<template>
  <!-- Bloco do template: Estrutura visual do componente -->
  <div class="contact-container">
    <!-- Título da seção de contato -->
    <h2>Entre em Contato</h2>
    <!-- Texto introdutório -->
    <p>Para mais informações, entre em contato conosco:</p>
    <!-- Lista com detalhes de contato -->
    <ul>
      <li>Email: <a href="mailto:a71522@ualg.pt">a71522@ualg.pt</a></li>
      <li>Telefone: <a href="tel:+351936051611">(+351) 936051611</a></li>
      <li>Endereço: Rua de Berlim, n79</li>
    </ul>

    <!-- Bloco de envio de mensagem -->
    <div class="contact-message">
      <!-- Explicação do propósito do formulário -->
      <p>
        Quer utilizar as nossas instalações físicas? Então informe abaixo o seu e-mail e iremos entrar em contacto!
      </p>
      <!-- Formulário de contato -->
      <form @submit.prevent="handleSubmit">
        <label for="email">E-mail:</label>
        <!-- Campo de entrada do e-mail -->
        <input 
          v-model="email" 
          id="email" 
          type="email" 
          placeholder="Digite o seu e-mail" 
          required 
        />
        <!-- Botão para enviar -->
        <button type="submit">Enviar</button>
      </form>
      <!-- Mensagem de sucesso -->
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <!-- Mensagem de erro -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  // Nome do componente
  name: "ContactComponent",
  // Bloco de dados: Define as variáveis usadas no componente
  data() {
    return {
      email: '', // Armazena o e-mail digitado pelo usuário
      successMessage: '', // Mensagem de sucesso ao enviar o e-mail
      errorMessage: '', // Mensagem de erro caso algo dê errado
    };
  },
  // Bloco de métodos: Define as funções do componente
  methods: {
    // Função para tratar o envio do formulário
    async handleSubmit() {
      // Validação básica do campo de e-mail
      if (!this.email || !this.email.includes('@')) {
        this.errorMessage = 'Por favor, insira um e-mail válido.';
        return;
      }

      try {
        // Faz uma solicitação para enviar o e-mail ao servidor
        const response = await fetch('http://localhost:8081/api/send-email', {
          method: 'POST', // Método HTTP
          headers: { 'Content-Type': 'application/json' }, // Cabeçalhos
          body: JSON.stringify({
            to: this.email, // E-mail do destinatário
            subject: 'Interesse em instalações físicas', // Assunto do e-mail
            text: 'Bem vindo ao Fitness Hub! Para utilizar das nossas instalações físicas, basta se deslocar até nós para efetuar a reserva! Ficamos à sua espera!', // Corpo do e-mail
          }),
        });

        const result = await response.json(); // Converte a resposta para JSON
        // Verifica se a solicitação foi bem-sucedida
        if (response.ok) {
          this.successMessage = 'E-mail enviado com sucesso! Verifique sua caixa de entrada.';
          this.errorMessage = '';
          this.email = ''; // Limpa o campo de entrada
        } else {
          // Mostra uma mensagem de erro caso a solicitação falhe
          this.errorMessage = result.message || 'Erro ao enviar o e-mail.';
          this.successMessage = '';
        }
      } catch (error) {
        // Trata erros na conexão ou no envio
        this.errorMessage = 'Erro ao enviar o e-mail. Tente novamente mais tarde.';
        this.successMessage = '';
      }
    },
  },
};
</script>

<style scoped>
/* Bloco de estilos: Estilização do componente */
/* Estilo da seção principal */
.contact-container {
  text-align: center;
  padding: 2rem;
}

/* Estilo do título */
.contact-container h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

/* Estilo do texto */
.contact-container p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

/* Lista sem marcadores */
.contact-container ul {
  list-style: none;
  padding: 0;
}

/* Estilo dos itens da lista */
.contact-container li {
  margin-bottom: 0.5rem;
}

/* Links para e-mail e telefone */
.contact-container a {
  color: #3498db;
  text-decoration: none;
}

.contact-container a:hover {
  color: #1abc9c;
}

/* Estilo da seção de mensagem */
.contact-message {
  margin-top: 2rem;
}

/* Estilo do rótulo do campo */
.contact-message label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

/* Estilo do campo de entrada */
.contact-message input {
  width: 50%;
  max-width: 400px;
  padding: 10px;
  margin: 10px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.contact-message input:focus {
  border-color: #3498db;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  outline: none;
}

/* Estilo do botão */
.contact-message button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.contact-message button:hover {
  background-color: #0056b3;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

/* Mensagem de sucesso */
.success-message {
  color: green;
  margin-top: 20px;
}

/* Mensagem de erro */
.error-message {
  color: red;
  margin-top: 20px;
}
</style>
