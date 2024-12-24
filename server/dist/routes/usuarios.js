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
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        tipo TEXT NOT NULL,
        senha TEXT NOT NULL
      )
    `);
    }
});
// Listar usuários
router.get("/", (req, res) => {
    db.all("SELECT id, nome, email, tipo FROM usuarios", [], (err, rows) => {
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
    const { nome, email, tipo, senha } = req.body;
    console.log("Dados recebidos no POST:", { nome, email, tipo, senha });
    // Validação dos campos obrigatórios
    if (!nome || !email || !tipo || !senha) {
        res.status(400).send("Nome, email, tipo e senha são obrigatórios.");
        return;
    }
    if (senha.length < 6) {
        res.status(400).send("A senha deve ter pelo menos 6 caracteres.");
        return;
    }
    // Inserir o novo usuário
    const insertSql = "INSERT INTO usuarios (nome, email, tipo, senha) VALUES (?, ?, ?, ?)";
    db.run(insertSql, [nome, email, tipo, senha], function (err) {
        if (err) {
            console.error("Erro ao inserir no banco:", err.message);
            res.status(500).send("Erro ao adicionar usuário.");
        }
        else {
            res.status(201).send(`Usuário adicionado com sucesso com ID: ${this.lastID}`);
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
