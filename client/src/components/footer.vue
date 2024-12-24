<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 Fitness Hub. Todos os direitos reservados.</p>
      <ul class="footer-links">
        <li><a href="/privacy">Política de Privacidade</a></li>
        <li><a href="/terms">Termos de Uso</a></li>
        <li><a href="/contact">Contato</a></li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background-color: #2c3e50; /* Cor de fundo */
  color: #ecf0f1; /* Cor do texto */
  text-align: center;
  padding: 1rem;
  position: relative; /* Alterado para evitar sobreposição */
  bottom: 0;
  width: 100%; /* Ocupar toda a largura da tela */
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.2);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1rem;
}

.footer-links a {
  color: #1abc9c;
  text-decoration: none;
  font-size: 0.9rem;
}

.footer-links a:hover {
  color: #16a085; /* Cor de destaque ao passar o mouse */
}
</style>
