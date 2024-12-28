import express, { Router, Request, Response } from "express";
import sqlite3 from "sqlite3";
import path from "path";
import { validatePassword } from "../middlewares/validatePassword"; // Importa o middleware de validação de senha

const router: Router = Router();

// Caminho para o banco de dados SQLite
const dbPath = path.join(__dirname, "../../db/usuarios.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados SQLite:", err.message);
  } else {
    console.log("Banco de dados SQLite conectado para registro.");
  }
});

// Rota de Registro com middleware de validação de senha
router.post("/", validatePassword, (req: Request, res: Response): void => {
  const { nome, email, senha, tipo } = req.body;
  // Validações de campos obrigatórios
  if (!nome || !email || !senha || !tipo) {
    res.status(400).json({ message: "Todos os campos são obrigatórios." });
    return;
  }

  // Verifica se o email já existe no banco de dados
  const emailQuery = "SELECT * FROM usuarios WHERE email = ?";
  db.get(emailQuery, [email], (err: Error | null, row: any) => {
    if (err) {
      console.error("Erro ao verificar email no banco de dados:", err.message);
      res.status(500).json({ message: "Erro no servidor." });
      return;
    }

    if (row) {
      res.status(409).json({ message: "Este email já está registrado." });
      return;
    }

    // Insere o novo usuário no banco de dados
    const insertQuery = "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)";
    db.run(insertQuery, [nome, email, senha, tipo], function (err: Error | null) {
      if (err) {
        console.error("Erro ao registrar usuário:", err.message);
        res.status(500).json({ message: "Erro ao registrar usuário." });
        return;
      }

      res.status(201).json({ message: "Usuário registrado com sucesso!", userId: this.lastID });
    });
  });
});

// Exporta o roteador
export default router;
