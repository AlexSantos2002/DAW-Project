import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuarios';
import loginRoutes from './routes/login';
import registerRoutes from './routes/register';
import { errorHandler } from './middlewares/errorhandler';
import { sendEmail } from './serverp/emailservice';

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080' })); // Ajuste para o frontend

// Rotas relacionadas aos usuários
app.use('/usuarios', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

// Rota para envio de e-mails
app.post('/api/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    console.log('Recebendo solicitação de envio de e-mail...');
    console.log('Dados da solicitação:', { to, subject, text });

    await sendEmail(to, subject, text);

    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao enviar o e-mail:', error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Erro desconhecido ao enviar o e-mail:', error);
      res.status(500).json({ message: 'Erro ao enviar o e-mail. Tente novamente mais tarde.' });
    }
  }
});

// Middleware para lidar com erros
app.use(errorHandler);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
