"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
// Caminho para o banco de dados SQLite
const dbPath = path_1.default.join(__dirname, "../../db/usuarios.db");
const db = new sqlite3_1.default.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados SQLite:", err.message);
    }
    else {
        console.log("Banco de dados SQLite conectado para registro.");
    }
});
// Rota de Registro
router.post("/", (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    // Validações de campos obrigatórios
    if (!nome || !email || !senha || !tipo) {
        res.status(400).json({ message: "Todos os campos são obrigatórios." });
        return;
    }
    // Validação de comprimento da senha
    if (senha.length < 6) {
        res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres." });
        return;
    }
    // Verifica se o email já existe no banco de dados
    const emailQuery = "SELECT * FROM usuarios WHERE email = ?";
    db.get(emailQuery, [email], (err, row) => {
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
        db.run(insertQuery, [nome, email, senha, tipo], function (err) {
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
exports.default = router;
