import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarios";
import loginRoutes from "./routes/login"; // Importe a rota de login

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors());

// Rotas relacionadas aos usuários
app.use("/usuarios", usuarioRoutes);

// Rotas relacionadas ao login
app.use("/login", loginRoutes); // Registra a rota de login

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
