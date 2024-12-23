import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Erro:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Erro interno do servidor.",
  });
};
