const { connectToDatabase, sql } = require("../config/database");

class Usuario {
    static async criarUsuario(nome, email, senha) {
        try {
            const pool = await connectToDatabase();
            await pool.request()
                .input("nome", sql.NVarChar, nome)
                .input("email", sql.NVarChar, email)
                .input("senha", sql.NVarChar, senha)
                .query("INSERT INTO Usuarios (Nome, Email, Senha) VALUES (@nome, @email, @senha)");
        } catch (error) {
            throw new Error("Erro ao criar usuário: " + error.message);
        }
    }
}

module.exports = Usuario;
