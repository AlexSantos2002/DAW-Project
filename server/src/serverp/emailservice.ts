import nodemailer from 'nodemailer';

const EMAIL_USER = 'a71522@ualg.pt';
const EMAIL_PASS = 'GLgc304xl';
const EMAIL_HOST = 'smtp.office365.com';
const EMAIL_PORT = 587;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  logger: true,
  debug: true,
});

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
    console.log('Iniciando envio de e-mail...');
    console.log(`Para: ${to}`);
    console.log(`Assunto: ${subject}`);
    console.log(`Corpo: ${text}`);

    const info = await transporter.sendMail({
      from: `"Fitness Hub" <${EMAIL_USER}>`,
      to,
      subject,
      text,
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'Nodemailer',
      },
    });

    console.log('E-mail enviado com sucesso:', info);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao enviar o e-mail:', error.message);
    } else {
      console.error('Erro desconhecido ao enviar o e-mail:', error);
    }
    throw error;
  }
}
