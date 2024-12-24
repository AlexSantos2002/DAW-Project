<template>
  <div class="home">
    <div class="hero-section">
      <h1>Bem-vindo ao Fitness Hub!</h1>
      <p>Seu parceiro na jornada para uma vida saudável e equilibrada.</p>
      <div class="buttons">
        <button class="btn start-btn">Comece Agora</button>
        <button class="btn learn-btn">Saiba Mais</button>
      </div>
    </div>

    <div class="features-section">
      <div class="feature">
        <h3>Programas Personalizados</h3>
        <p>Obtenha recomendações de treino e dieta que se ajustam às suas necessidades.</p>
      </div>
      <div class="feature">
        <h3>Monitoramento de Progresso</h3>
        <p>Acompanhe seu desempenho e alcance seus objetivos de forma mais eficiente.</p>
      </div>
      <div class="feature">
        <h3>Comunidade Ativa</h3>
        <p>Conecte-se com outros membros e receba suporte durante sua jornada.</p>
      </div>
    </div>

    <!-- Seção de Depoimentos -->
    <div class="testimonials-section">
      <h2>Histórias de Sucesso</h2>
      <p>Veja o que nossos membros têm a dizer.</p>
      <div class="testimonials">
        <div class="testimonial">
          <p>
            "O Fitness Hub mudou minha vida! Perdi 10kg em 3 meses e ganhei mais
            confiança em mim mesmo."
          </p>
          <span>- João Silva</span>
        </div>
        <div class="testimonial">
          <p>
            "A plataforma é incrível! Os treinos personalizados e a comunidade
            me mantêm motivada todos os dias."
          </p>
          <span>- Maria Oliveira</span>
        </div>
        <div class="testimonial">
          <p>
            "Finalmente encontrei um lugar onde consigo monitorar meu progresso
            e ver resultados reais!"
          </p>
          <span>- Pedro Santos</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>

<style scoped>
/* Seção Hero */
.hero-section {
  text-align: center;
  padding: 2rem;
  background-color: #ecf0f1;
  color: #2c3e50;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 800px;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.start-btn {
  background-color: #1abc9c;
  color: #fff;
}

.start-btn:hover {
  background-color: #16a085;
  transform: scale(1.05);
}

.learn-btn {
  background-color: #3498db;
  color: #fff;
}

.learn-btn:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

/* Seção de Recursos */
.features-section {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 2rem;
  padding: 0 2rem;
}

.feature {
  background-color: #fff;
  color: #2c3e50;
  text-align: center;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.feature h3 {
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
}

.feature p {
  font-size: 1rem;
  line-height: 1.5;
}

/* Seção de Depoimentos */
.testimonials-section {
  text-align: center;
  padding: 2rem 2rem;
  background-color: #f9f9f9;
  color: #2c3e50;
  margin-top: -2rem; /* Ajusta a posição para preencher o buraco */
}

.testimonials-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.testimonials-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.testimonials {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap; /* Responsivo */
}

.testimonial {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  max-width: 280px;
  flex: 1;
}

.testimonial p {
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 1rem;
}

.testimonial span {
  font-size: 0.9rem;
  color: #7f8c8d;
}
</style>
