import { Router, Request, Response } from "express";
import sqlite3 from "sqlite3";
import path from "path";

const router = Router();
const dbPath = path.join(__dirname, "../../db/usuarios.db");

// Inicializa o banco de dados SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados SQLite:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
    // Cria a tabela se ela não existir
    db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        tipo TEXT NOT NULL CHECK (tipo IN ('cliente', 'pt'))
      )
    `);
  }
});

// Listar usuários
router.get("/", (req: Request, res: Response) => {
  db.all("SELECT * FROM usuarios", [], (err, rows) => {
    if (err) {
      console.error("Erro ao listar usuários:", err.message);
      res.status(500).send("Erro ao listar usuários.");
    } else {
      res.json(rows);
    }
  });
});

// Adicionar um usuário
router.post("/", (req: Request, res: Response) => {
  const { id, nome, email, tipo } = req.body;

  // Validação dos campos
  if (!id || !nome || !email || !tipo) {
    res.status(400).send("ID, nome, email e tipo são obrigatórios.");
    return;
  }

  if (tipo !== "cliente" && tipo !== "pt") {
    res.status(400).send('O campo "tipo" deve ser "cliente" ou "pt".');
    return;
  }

  // Inserindo no banco de dados
  const sql = "INSERT INTO usuarios (id, nome, email, tipo) VALUES (?, ?, ?, ?)";
  db.run(sql, [id, nome, email, tipo], (err) => {
    if (err) {
      if (err.message.includes("UNIQUE")) {
        res.status(400).send("Um usuário com este ID já existe.");
      } else {
        console.error("Erro ao adicionar usuário:", err.message);
        res.status(500).send("Erro ao adicionar usuário.");
      }
    } else {
      res.status(201).send("Usuário adicionado com sucesso.");
    }
  });
});

// Remover um usuário
router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const sql = "DELETE FROM usuarios WHERE id = ?";
  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Erro ao remover usuário:", err.message);
      res.status(500).send("Erro ao remover usuário.");
    } else if (this.changes === 0) {
      res.status(404).send("Usuário não encontrado.");
    } else {
      res.send("Usuário removido com sucesso.");
    }
  });
});

// Exporta apenas o roteador
export default router;
