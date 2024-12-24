import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue"; // Certifique-se de que o arquivo existe
import dashboard from "../views/dashboard.vue"; // Importa a view dashboard

const routes = [
  { path: "/", name: "home", component: home }, // Rota inicial
  { path: "/dashboard", name: "dashboard", component: dashboard }, // Rota para a dashboard
];

const router = createRouter({
  history: createWebHistory(), // Usa o modo de histórico do navegador
  routes,
});

export default router; // Exporta o roteador para ser usado no main.js
