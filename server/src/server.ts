import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarios"; // Rotas de usuários
import loginRoutes from "./routes/login"; // Rotas de login
import registerRoutes from "./routes/register"; // Rotas de registro
import gruposRoutes from "./routes/grupos"; // Rotas de grupos
import exerciciosRoutes from "./routes/exercicios"; // Rotas de exercícios
import { errorHandler } from "./middlewares/errorhandler"; // Middleware para erros
import { sendEmail } from "./serverp/emailservice"; // Serviço de envio de e-mails

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(express.json()); // Permite JSON no corpo da requisição
app.use(cors({ origin: "http://localhost:8080" })); // Permite requisições do frontend

// Rotas relacionadas aos usuários
app.use("/usuarios", usuarioRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

// Rotas relacionadas aos grupos
app.use("/grupos", gruposRoutes);

// Rotas relacionadas aos exercícios
app.use("/exercicios", exerciciosRoutes);

// Rota para envio de e-mails
app.post("/api/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    console.log("Recebendo solicitação de envio de e-mail...");
    console.log("Dados da solicitação:", { to, subject, text });

    await sendEmail(to, subject, text);

    res.status(200).json({ message: "E-mail enviado com sucesso!" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao enviar o e-mail:", error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.error("Erro desconhecido ao enviar o e-mail:", error);
      res.status(500).json({
        message: "Erro ao enviar o e-mail. Tente novamente mais tarde.",
      });
    }
  }
});

// Middleware para lidar com erros
app.use(errorHandler);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
