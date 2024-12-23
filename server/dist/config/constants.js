"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PATH = exports.PORT = void 0;
exports.PORT = process.env.PORT || 8081;
exports.DB_PATH = process.env.DB_PATH || "db/usuarios.db";
