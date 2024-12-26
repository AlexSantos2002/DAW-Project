<template>
  <div class="contact-container">
    <h2>Entre em Contato</h2>
    <p>Para mais informações, entre em contato conosco:</p>
    <ul>
      <li>Email: <a href="mailto:a71522@ualg.pt">a71522@ualg.pt</a></li>
      <li>Telefone: <a href="tel:+5511999999999">(11) 99999-9999</a></li>
      <li>Endereço: Rua de Berlim, n79</li>
    </ul>

    <div class="contact-message">
      <p>
        Quer utilizar as nossas instalações físicas? Então informe abaixo o seu e-mail e iremos entrar em contacto!
      </p>
      <form @submit.prevent="handleSubmit">
        <label for="email">E-mail:</label>
        <input 
          v-model="email" 
          id="email" 
          type="email" 
          placeholder="Digite o seu e-mail" 
          required 
        />
        <button type="submit">Enviar</button>
      </form>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactComponent",
  data() {
    return {
      email: '',
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: this.email,
            subject: 'Interesse em instalações físicas',
            text: 'Gostaríamos de entrar em contato com você!',
          }),
        });

        const result = await response.json();
        if (response.ok) {
          this.successMessage = 'E-mail enviado com sucesso! Verifique sua caixa de entrada.';
          this.errorMessage = '';
          this.email = ''; // Limpa o campo de entrada
        } else {
          this.errorMessage = result.message || 'Erro ao enviar o e-mail.';
          this.successMessage = '';
        }
      } catch (error) {
        this.errorMessage = 'Erro ao enviar o e-mail. Tente novamente mais tarde.';
        this.successMessage = '';
      }
    },
  },
};
</script>

<style scoped>
.contact-container {
  text-align: center;
  padding: 2rem;
}

.contact-container h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.contact-container p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.contact-container ul {
  list-style: none;
  padding: 0;
}

.contact-container li {
  margin-bottom: 0.5rem;
}

.contact-container a {
  color: #3498db;
  text-decoration: none;
}

.contact-container a:hover {
  color: #1abc9c;
}

.contact-message {
  margin-top: 2rem;
}

.contact-message label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.contact-message input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.contact-message button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.contact-message button:hover {
  background-color: #0056b3;
}

.success-message {
  color: green;
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 20px;
}
</style>
