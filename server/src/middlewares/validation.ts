import { Request, Response, NextFunction } from "express";

export const validateUsuario = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { nome, email, tipo } = req.body;

  if (!nome || !email || !["Cliente", "PT"].includes(tipo)) {
    res.status(400).send("Dados inválidos! Certifique-se de incluir nome, email e tipo (Cliente ou PT).");
  } else {
    next();
  }
};
