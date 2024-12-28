// Importa os tipos Request, Response e NextFunction do Express
import { Request, Response, NextFunction } from "express";

// Middleware para tratamento de erros globais
export const errorHandler = (
  err: any, // Objeto de erro recebido
  req: Request, // Objeto da requisição
  res: Response, // Objeto da resposta
  next: NextFunction // Função para o próximo middleware (não usada aqui)
): void => {
  // Loga o erro no console para depuração
  console.error("Erro:", err.message);

  // Envia uma resposta JSON com o status de erro e a mensagem
  res.status(err.status || 500).json({
    error: err.message || "Erro interno do servidor.", // Mensagem de erro padrão
  });
};
