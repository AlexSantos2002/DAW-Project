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

    // Cria a tabela para vincular usuários aos grupos
    db.run(`
      CREATE TABLE IF NOT EXISTS usuarios_grupos (
        usuario_id INTEGER,
        grupo_id INTEGER,
        PRIMARY KEY (usuario_id, grupo_id),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY (grupo_id) REFERENCES grupos(id)
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
      res.status(201).json({ id: this.lastID, nome, descricao });
    }
  });
});

interface Group {
  id: number;
}

router.post("/entrar", (req: Request, res: Response) => {
  const { nome, usuario_id } = req.body;

  if (!nome || !usuario_id) {
    res.status(400).send("O nome do grupo e o ID do usuário são obrigatórios.");
    return;
  }

  const findGroupSql = "SELECT id FROM grupos WHERE nome = ?";
  db.get(findGroupSql, [nome], (err, group: Group | undefined) => {
    if (err) {
      console.error("Erro ao procurar grupo:", err.message);
      return res.status(500).send("Erro ao procurar grupo.");
    }

    if (!group) {
      return res.status(404).send("Grupo não encontrado.");
    }

    const insertSql = `
      INSERT INTO usuarios_grupos (usuario_id, grupo_id)
      VALUES (?, ?)
    `;
    db.run(insertSql, [usuario_id, group.id], (err) => {
      if (err) {
        console.error("Erro ao entrar no grupo:", err.message);
        return res.status(500).send("Erro ao entrar no grupo.");
      }

      res.status(201).send(`Usuário adicionado ao grupo "${nome}" com sucesso.`);
    });
  });
});


// Listar usuários em um grupo
router.get("/:groupId/usuarios", (req: Request, res: Response) => {
  const groupId = parseInt(req.params.groupId);

  if (isNaN(groupId)) {
    res.status(400).send("ID do grupo inválido.");
    return;
  }

  const sql = `
    SELECT u.id, u.nome, u.email
    FROM usuarios u
    JOIN usuarios_grupos ug ON u.id = ug.usuario_id
    WHERE ug.grupo_id = ?
  `;
  db.all(sql, [groupId], (err, rows) => {
    if (err) {
      console.error("Erro ao listar usuários do grupo:", err.message);
      res.status(500).send("Erro ao listar usuários do grupo.");
    } else {
      res.json(rows);
    }
  });
});

// Remover um grupo
router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).send("ID do grupo inválido.");
    return;
  }

  const sql = "DELETE FROM grupos WHERE id = ?";
  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Erro ao remover grupo:", err.message);
      res.status(500).send("Erro ao remover grupo.");
    } else if (this.changes === 0) {
      res.status(404).send("Grupo não encontrado.");
    } else {
      res.send("Grupo removido com sucesso.");
    }
  });
});

export default router;
