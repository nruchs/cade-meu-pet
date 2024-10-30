const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};

async function connectToDatabase() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log("Conectado ao banco de dados!");
        return pool;
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        throw error;
    }
}

module.exports = {
    connectToDatabase,
    sql
};
