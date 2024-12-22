import express, { Request, Response } from "express";
import { Worker as UsuarioWorker } from "./usuarios"

const app = express();
app.use(express.json());

app.get("/usuarios", async (req: Request, res: Response) => {
  try {
    const worker = new UsuarioWorker();
    const usuarios = await worker.listUsuarios();
    res.json(usuarios);
  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    res.status(500).send("Erro ao listar usuários.");
  }
});

app.post("/usuarios", async (req: Request, res: Response) => {
  try {
    const worker = new UsuarioWorker();
    const novoUsuario = await worker.addUsuario(req.body);
    res.json(novoUsuario);
  } catch (err) {
    console.error("Erro ao adicionar usuário:", err);
    res.status(500).send("Erro ao adicionar usuário.");
  }
});

app.delete("/usuarios/:id", async (req: Request, res: Response) => {
  try {
    const worker = new UsuarioWorker();
    await worker.deleteUsuario(parseInt(req.params.id));
    res.send("Usuário removido.");
  } catch (err) {
    console.error("Erro ao remover usuário:", err);
    res.status(500).send("Erro ao remover usuário.");
  }
});

app.listen(8081, () => {
  console.log("Servidor rodando na porta 8081.");
});
