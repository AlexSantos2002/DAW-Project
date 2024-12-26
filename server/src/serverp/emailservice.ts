import nodemailer from 'nodemailer';

const EMAIL_USER = 'a71522@ualg.pt';
const EMAIL_PASS = 'GLgc304xl';
const EMAIL_HOST = 'smtp.office365.com';
const EMAIL_PORT = 587;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false, // Deve ser false para STARTTLS
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  // Removido logger e debug para evitar logs desnecessários
});

// Verifica a configuração do transporte SMTP
transporter.verify((error, success) => {
  if (error) {
    console.error('Erro ao conectar ao servidor SMTP:', error.message);
  } else {
    console.log('Servidor SMTP conectado com sucesso!');
  }
});

export async function sendEmail(
  to: string,
  subject: string,
  text: string
): Promise<void> {
  try {
    // Mensagem simples no início do envio
    console.log('Iniciando envio de e-mail...');

    const info = await transporter.sendMail({
      from: `"Fitness Hub" <${EMAIL_USER}>`, // Nome exibido no e-mail
      to,
      subject,
      text,
      headers: {
        'X-Priority': '3', // Prioridade normal
        'X-Mailer': 'Nodemailer', // Identificação do cliente
      },
    });

    // Mensagem apenas de sucesso
    console.log('E-mail enviado com sucesso:', info.messageId);
  } catch (error: unknown) {
    // Mensagem de erro simplificada
    if (error instanceof Error) {
      console.error('Erro ao enviar o e-mail:', error.message);
    } else {
      console.error('Erro desconhecido ao enviar o e-mail.');
    }
    throw error;
  }
}