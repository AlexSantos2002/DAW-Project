<template>
  <!-- Bloco do template: Estrutura visual do rodapé -->
  <footer class="footer">
    <div class="footer-content">
      <!-- Texto de copyright -->
      <p>&copy; 2024 Fitness Hub. Todos os direitos reservados.</p>
      <!-- Links do rodapé -->
      <ul class="footer-links">
        <!-- Link para a Política de Privacidade -->
        <li><a href="/privacy">Política de Privacidade</a></li>
        <!-- Link para os Termos de Uso -->
        <li><a href="/terms">Termos de Uso</a></li>
        <!-- Link para a página de Contato -->
        <li><a href="/contact">Contato</a></li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  // Nome do componente para identificação
  name: "Footer",
};
</script>

<style scoped>
/* Bloco de estilos: Estilização do rodapé */

/* Estilo principal do rodapé */
.footer {
  background-color: #212121; /* Cor de fundo */
  color: #ecf0f1; /* Cor do texto */
  text-align: center;
  padding: 1rem; /* Espaçamento interno */
  position: relative; /* Permite controlar a posição do rodapé */
  bottom: 0; /* Posiciona no final da página */
  width: 100%; /* Faz o rodapé ocupar toda a largura da tela */
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.2); /* Sombra para destaque */
}

/* Container para o conteúdo do rodapé */
.footer-content {
  display: flex;
  flex-direction: column; /* Coloca os elementos em coluna */
  align-items: center; /* Centraliza os itens horizontalmente */
  gap: 0.5rem; /* Espaçamento entre os elementos */
}

/* Estilo da lista de links no rodapé */
.footer-links {
  list-style: none; /* Remove os marcadores de lista */
  padding: 0; /* Remove o espaçamento interno */
  margin: 0; /* Remove o espaçamento externo */
  display: flex; /* Coloca os itens lado a lado */
  gap: 1rem; /* Espaçamento entre os links */
}

/* Estilo dos links no rodapé */
.footer-links a {
  color: #FF1744; /* Cor do link */
  text-decoration: none; /* Remove o sublinhado */
  font-size: 0.9rem; /* Tamanho da fonte */
}

/* Estilo ao passar o mouse sobre os links */
.footer-links a:hover {
  color: #B71C1C; /* Cor de destaque ao passar o rato */
}
</style>
