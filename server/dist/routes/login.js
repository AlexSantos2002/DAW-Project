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
        console.log("Banco de dados SQLite conectado para login.");
    }
});
// Rota de Login
router.post("/", (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        res.status(400).json({ message: "Email e senha são obrigatórios." });
        return;
    }
    // Verifica se o email existe no banco de dados
    const emailQuery = "SELECT * FROM usuarios WHERE email = ?";
    db.get(emailQuery, [email], (err, row) => {
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
        }
        else {
            // Senha incorreta
            res.status(401).json({ message: "Senha incorreta. Tente novamente." });
        }
    });
});
// Exporta o roteador
exports.default = router;
