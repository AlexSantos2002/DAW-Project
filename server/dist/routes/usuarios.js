"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const dbPath = path_1.default.join(__dirname, "../../db/usuarios.db");
// Inicializa o banco de dados SQLite
const db = new sqlite3_1.default.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados SQLite:", err.message);
    }
    else {
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
router.get("/", (req, res) => {
    db.all("SELECT * FROM usuarios", [], (err, rows) => {
        if (err) {
            console.error("Erro ao listar usuários:", err.message);
            res.status(500).send("Erro ao listar usuários.");
        }
        else {
            res.json(rows);
        }
    });
});
// Adicionar um usuário
router.post("/", (req, res) => {
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
            }
            else {
                console.error("Erro ao adicionar usuário:", err.message);
                res.status(500).send("Erro ao adicionar usuário.");
            }
        }
        else {
            res.status(201).send("Usuário adicionado com sucesso.");
        }
    });
});
// Remover um usuário
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const sql = "DELETE FROM usuarios WHERE id = ?";
    db.run(sql, [id], function (err) {
        if (err) {
            console.error("Erro ao remover usuário:", err.message);
            res.status(500).send("Erro ao remover usuário.");
        }
        else if (this.changes === 0) {
            res.status(404).send("Usuário não encontrado.");
        }
        else {
            res.send("Usuário removido com sucesso.");
        }
    });
});
// Exporta apenas o roteador
exports.default = router;
