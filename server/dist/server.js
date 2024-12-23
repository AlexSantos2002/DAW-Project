"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const errorhandler_1 = require("./middlewares/errorhandler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8081;
// Middleware para interpretar JSON
app.use(express_1.default.json());
// Rotas relacionadas aos usuários
app.use("/usuarios", usuarios_1.default);
// Middleware para lidar com erros
app.use(errorhandler_1.errorHandler);
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
