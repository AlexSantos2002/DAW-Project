import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarios";
import loginRoutes from "./routes/login";
import registerRoutes from "./routes/register";
import { errorHandler } from "./middlewares/errorhandler";

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware para interpretar JSON
app.use(express.json());
app.use(cors());

// Rotas relacionadas aos usuários
app.use("/usuarios", usuarioRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

// Middleware para lidar com erros
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
