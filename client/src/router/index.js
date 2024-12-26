import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Dashboard from "../views/dashboard.vue";
import About from "../views/about.vue";
import Contact from "../views/contact.vue";
import MyActivities from "../views/matividades.vue"; // Importa a nova página de Minhas Atividades
import GroupActivities from "../views/gatividades.vue"; // Importa a nova página de Atividades em Grupo

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/about", name: "about", component: About },
  { path: "/contact", name: "contact", component: Contact },
  { path: "/matividades", name: "myActivities", component: MyActivities }, // Adiciona rota para Minhas Atividades
  { path: "/gatividades", name: "groupActivities", component: GroupActivities }, // Adiciona rota para Atividades em Grupo
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
