import { Request, Response, NextFunction } from "express";

// Middleware para validar senhas
export const validatePassword = (req: Request, res: Response, next: NextFunction): void => {
  const { senha } = req.body; // Obtém a senha do corpo da requisição

  // Critérios de validação
  const minLength = 6; // Pelo menos 6 caracteres
  const hasNumber = /\d/; // Pelo menos um número
  const hasSpecialChar = /[!?#=]/; // Pelo menos um dos caracteres especiais

  // Verifica se a senha está presente
  if (!senha) {
    console.log("[VALIDAÇÃO] Senha não fornecida.");
    res.status(400).json({ message: "A senha é obrigatória." });
    return;
  }

  // Verifica se a senha atende aos critérios
  if (
    senha.length < minLength ||
    !hasNumber.test(senha) ||
    !hasSpecialChar.test(senha)
  ) {
    console.log("[VALIDAÇÃO] Senha inválida:", senha);
    res.status(400).json({
      message: "A senha deve ter pelo menos 6 caracteres, conter um número e pelo menos um dos seguintes caracteres: !, ?, #, =.",
    });
    return;
  }

  // Senha válida, prossegue para o próximo middleware ou rota
  console.log("[VALIDAÇÃO] Senha válida:", senha);
  next();
};
