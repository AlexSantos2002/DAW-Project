import express from "express";
import usuarioRoutes from "./routes/usuarios";
import { errorHandler } from "./middlewares/errorhandler";


const app = express();
const PORT = process.env.PORT || 8081;

// Middleware para interpretar JSON
app.use(express.json());

// Rotas relacionadas aos usuários
app.use("/usuarios", usuarioRoutes);

// Middleware para lidar com erros
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
