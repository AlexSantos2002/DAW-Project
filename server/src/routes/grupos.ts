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
    // Cria a tabela de grupos se ela não existir
    db.run(`
      CREATE TABLE IF NOT EXISTS grupos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT
      )
    `);
  }
});

// Listar grupos
router.get("/", (req: Request, res: Response) => {
    db.all("SELECT * FROM grupos", [], (err, rows) => {
      if (err) {
        console.error("Erro ao listar grupos:", err.message);
        res.status(500).send("Erro ao listar grupos.");
      } else {
        res.json(rows);
      }
    });
  });  

// Adicionar um grupo
router.post("/", (req: Request, res: Response) => {
    const { nome, descricao } = req.body;
  
    if (!nome) {
      res.status(400).send("O nome do grupo é obrigatório.");
      return;
    }
  
    const sql = "INSERT INTO grupos (nome, descricao) VALUES (?, ?)";
    db.run(sql, [nome, descricao || null], function (err) {
      if (err) {
        console.error("Erro ao adicionar grupo:", err.message);
        res.status(500).send("Erro ao adicionar grupo.");
      } else {
        res.status(201).json({ id: this.lastID, message: "Grupo criado com sucesso." });
      }
    });
  });  

// Remover um grupo
router.delete("/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
  
    const sql = "DELETE FROM grupos WHERE id = ?";
    db.run(sql, [id], function (err) {
      if (err) {
        console.error("Erro ao remover grupo:", err.message);
        res.status(500).send("Erro ao remover grupo.");
      } else if (this.changes === 0) {
        res.status(404).send("Grupo não encontrado.");
      } else {
        res.send({ message: "Grupo removido com sucesso." });
      }
    });
  });
  

// Exporta apenas o roteador
export default router;
