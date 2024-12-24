import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Dashboard from "../views/dashboard.vue";
import About from "../views/about.vue";
import Contact from "../views/contact.vue"; // Importa a nova página de Contatos

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/about", name: "about", component: About },
  { path: "/contact", name: "contact", component: Contact }, // Adiciona a rota para Contatos
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
