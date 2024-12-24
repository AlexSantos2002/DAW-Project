<template>
    <div class="contact-container">
      <h2>Entre em Contato</h2>
      <p>Para mais informações, entre em contato conosco:</p>
      <ul>
        <li>Email: <a href="mailto:a71522@ualg.pt">a71522@ualg.pt</a></li>
        <li>Telefone: <a href="tel:+5511999999999">(11) 99999-9999</a></li>
        <li>Endereço: Rua Exemplo, 123, São Paulo, SP</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContactComponent",
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
  </style>
  