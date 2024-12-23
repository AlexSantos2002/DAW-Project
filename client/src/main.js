import { createApp } from "vue";
import App from "./app.vue";
import router from "./router"; // Importa o roteador configurado

// Cria a instância da aplicação Vue e usa o roteador
createApp(App).use(router).mount("#app");
