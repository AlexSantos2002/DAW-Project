"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarios_1 = require("./usuarios");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/usuarios", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const worker = new usuarios_1.Worker();
        const usuarios = yield worker.listUsuarios();
        res.json(usuarios);
    }
    catch (err) {
        console.error("Erro ao listar usuários:", err);
        res.status(500).send("Erro ao listar usuários.");
    }
}));
app.post("/usuarios", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const worker = new usuarios_1.Worker();
        const novoUsuario = yield worker.addUsuario(req.body);
        res.json(novoUsuario);
    }
    catch (err) {
        console.error("Erro ao adicionar usuário:", err);
        res.status(500).send("Erro ao adicionar usuário.");
    }
}));
app.delete("/usuarios/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const worker = new usuarios_1.Worker();
        yield worker.deleteUsuario(parseInt(req.params.id));
        res.send("Usuário removido.");
    }
    catch (err) {
        console.error("Erro ao remover usuário:", err);
        res.status(500).send("Erro ao remover usuário.");
    }
}));
app.listen(8081, () => {
    console.log("Servidor rodando na porta 8081.");
});
