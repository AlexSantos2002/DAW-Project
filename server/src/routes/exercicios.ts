import { Router, Request, Response } from "express";
import sqlite3 from "sqlite3";
import path from "path";

const router = Router();
const dbPath = path.join(__dirname, "../../db/usuarios.db");

// Inicializa o banco de dados SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados SQLite para exercícios:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite para exercícios.");
    db.run(`
      CREATE TABLE IF NOT EXISTS exercicios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        nome_exercicio TEXT NOT NULL,
        data TEXT NOT NULL,
        quilometros REAL,
        repeticoes INTEGER,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
      )
    `);
  }
});

// Listar exercícios por usuário
router.get("/", (req: Request, res: Response) => {
    const usuario_id = req.query.usuario_id;
  
    if (!usuario_id) {
      res.status(400).send("Usuário não especificado.");
      return;
    }
  
    db.all(
      "SELECT * FROM exercicios WHERE usuario_id = ? ORDER BY data ASC",
      [usuario_id],
      (err, rows) => {
        if (err) {
          console.error("Erro ao listar exercícios:", err.message);
          res.status(500).send("Erro ao listar exercícios.");
        } else {
          res.json(rows);
        }
      }
    );
  });  

// Adicionar um exercício
router.post("/", (req: Request, res: Response) => {
  const { usuario_id, nome_exercicio, data, quilometros, repeticoes } = req.body;

  console.log("Recebendo dados para adicionar exercício:", {
    usuario_id,
    nome_exercicio,
    data,
    quilometros,
    repeticoes,
  });

  if (!usuario_id || !nome_exercicio || !data) {
    console.error("Dados inválidos fornecidos:", { usuario_id, nome_exercicio, data });
    res.status(400).send("Usuário, nome do exercício e data são obrigatórios.");
    return;
  }

  const sql = `
    INSERT INTO exercicios (usuario_id, nome_exercicio, data, quilometros, repeticoes)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(
    sql,
    [usuario_id, nome_exercicio, data, quilometros || null, repeticoes || null],
    function (err) {
      if (err) {
        console.error("Erro ao inserir exercício no banco de dados:", err.message);
        res.status(500).send("Erro ao adicionar exercício.");
      } else {
        res.status(201).json({
          id: this.lastID,
          usuario_id,
          nome_exercicio,
          data,
          quilometros,
          repeticoes,
        });
      }
    }
  );
});

// Remover um exercício
router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const sql = "DELETE FROM exercicios WHERE id = ?";
  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Erro ao remover exercício:", err.message);
      res.status(500).send("Erro ao remover exercício.");
    } else if (this.changes === 0) {
      res.status(404).send("Exercício não encontrado.");
    } else {
      res.send("Exercício removido com sucesso.");
    }
  });
});

export default router;
