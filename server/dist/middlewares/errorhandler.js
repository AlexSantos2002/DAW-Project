"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error("Erro:", err.message);
    res.status(err.status || 500).json({
        error: err.message || "Erro interno do servidor.",
    });
};
exports.errorHandler = errorHandler;
