import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Dashboard from "../views/dashboard.vue";
import About from "../views/about.vue";
import Contact from "../views/contact.vue";
import MyActivities from "../views/matividades.vue"; // Minhas Atividades
import GroupActivities from "../views/gatividades.vue"; // Atividades em Grupo

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/about", name: "about", component: About },
  { path: "/contact", name: "contact", component: Contact },
  { path: "/matividades", name: "myActivities", component: MyActivities },
  { path: "/gatividades", name: "groupActivities", component: GroupActivities },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
