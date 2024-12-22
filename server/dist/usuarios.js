"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
class Worker {
    constructor() {
        const dbPath = path_1.default.join(__dirname, "../db/usuarios.db");
        this.db = new sqlite3_1.default.Database(dbPath, (err) => {
            if (err) {
                console.error("Erro ao conectar ao SQLite:", err);
            }
            else {
                console.log("Conectado ao banco de dados SQLite.");
                this.db.run(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            tipo TEXT CHECK(tipo IN ('Cliente', 'PT')) NOT NULL
          )`);
            }
        });
    }
    listUsuarios() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM usuarios", (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    addUsuario(usuario) {
        return new Promise((resolve, reject) => {
            const { nome, email, tipo } = usuario;
            this.db.run("INSERT INTO usuarios (nome, email, tipo) VALUES (?, ?, ?)", [nome, email, tipo], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ id: this.lastID, nome, email, tipo });
                }
            });
        });
    }
    deleteUsuario(id) {
        return new Promise((resolve, reject) => {
            this.db.run("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.Worker = Worker;
