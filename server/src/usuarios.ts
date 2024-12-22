import sqlite3 from "sqlite3";
import path from "path";

export class Worker {
  private db: sqlite3.Database;

  constructor() {
    const dbPath = path.join(__dirname, "../db/usuarios.db");
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Erro ao conectar ao SQLite:", err);
      } else {
        console.log("Conectado ao banco de dados SQLite.");
        this.db.run(
          `CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            tipo TEXT CHECK(tipo IN ('Cliente', 'PT')) NOT NULL
          )`
        );
      }
    });
  }

  listUsuarios(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM usuarios", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  addUsuario(usuario: { nome: string; email: string; tipo: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      const { nome, email, tipo } = usuario;
      this.db.run(
        "INSERT INTO usuarios (nome, email, tipo) VALUES (?, ?, ?)",
        [nome, email, tipo],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, nome, email, tipo });
          }
        }
      );
    });
  }

  deleteUsuario(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
