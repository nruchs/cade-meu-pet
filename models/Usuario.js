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

    // Função para buscar um usuário pelo email
    static async buscarUsuarioPorEmail(email) {
        try {
            const pool = await connectToDatabase();
            const result = await pool.request()
                .input("email", sql.NVarChar, email)
                .query("SELECT * FROM Usuarios WHERE Email = @email");
            return result.recordset[0];
        } catch (error) {
            throw new Error("Erro ao buscar usuário: " + error.message);
        }
    }

    static async buscarUsuarioPorId(id) {
        try {
            const pool = await connectToDatabase();
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("SELECT * FROM Usuarios WHERE UsuarioID = @id");
            return result.recordset[0];
        } catch (error) {
            throw new Error("Erro ao buscar usuário: " + error.message);
        }
    }

    static async atualizarUsuario(id, nome, email, senhaHash) {
        try {
            const pool = await connectToDatabase();
            const query = senhaHash
                ? "UPDATE Usuarios SET Nome = @nome, Email = @email, Senha = @senha WHERE UsuarioID = @id"
                : "UPDATE Usuarios SET Nome = @nome, Email = @email WHERE UsuarioID = @id";
            const request = pool.request()
                .input("id", sql.Int, id)
                .input("nome", sql.NVarChar, nome)
                .input("email", sql.NVarChar, email);
            if (senhaHash) {
                request.input("senha", sql.NVarChar, senhaHash);
            }
            await request.query(query);
        } catch (error) {
            throw new Error("Erro ao atualizar usuário: " + error.message);
        }
    }
}

module.exports = Usuario;
