import express, { Router, Request, Response } from "express";
import sqlite3 from "sqlite3";
import path from "path";

const router: Router = Router();

// Caminho para o banco de dados SQLite
const dbPath = path.join(__dirname, "../../db/usuarios.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados SQLite:", err.message);
  } else {
    console.log("Banco de dados SQLite conectado para login.");
  }
});

// Rota de Login
router.post("/", (req: Request, res: Response): void => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(400).json({ message: "Email e senha são obrigatórios." });
    return;
  }

  // Verifica se o email existe no banco de dados
  const emailQuery = "SELECT * FROM usuarios WHERE email = ?";
  db.get(emailQuery, [email], (err: Error | null, row: any) => {
    if (err) {
      console.error("Erro ao buscar email no banco de dados:", err.message);
      res.status(500).json({ message: "Erro no servidor." });
      return;
    }

    if (!row) {
      // Email não encontrado
      res.status(404).json({ message: "Email não encontrado. Verifique seus dados e tente novamente." });
      return;
    }

    // Verifica se a senha está correta
    if (row.senha === senha) {
      // Login bem-sucedido
      res.status(200).json({ message: "Login bem-sucedido!", redirect: "pageex" });
    } else {
      // Senha incorreta
      res.status(401).json({ message: "Senha incorreta. Tente novamente." });
    }
  });
});

// Exporta o roteador
export default router;
