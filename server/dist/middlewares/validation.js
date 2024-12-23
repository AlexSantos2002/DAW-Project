"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUsuario = void 0;
const validateUsuario = (req, res, next) => {
    const { nome, email, tipo } = req.body;
    if (!nome || !email || !["Cliente", "PT"].includes(tipo)) {
        res.status(400).send("Dados inválidos! Certifique-se de incluir nome, email e tipo (Cliente ou PT).");
    }
    else {
        next();
    }
};
exports.validateUsuario = validateUsuario;
