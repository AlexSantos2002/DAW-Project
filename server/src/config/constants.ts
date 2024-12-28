// Exporta a constante PORT, que define a porta em que o servidor será executado
// Se a variável de ambiente PORT não estiver definida, utiliza o valor padrão 8081
export const PORT = process.env.PORT || 8081;

// Exporta a constante DB_PATH, que define o caminho do banco de dados
// Se a variável de ambiente DB_PATH não estiver definida, utiliza o valor padrão "db/usuarios.db"
export const DB_PATH = process.env.DB_PATH || "db/usuarios.db";
