import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue"; // Certifique-se de que este arquivo existe

const routes = [
  { path: "/", name: "Home", component: Home }, // Rota inicial
];

const router = createRouter({
  history: createWebHistory(), // Usa o modo de histórico do navegador
  routes,
});

export default router; // Exporta o roteador para ser usado no main.js
