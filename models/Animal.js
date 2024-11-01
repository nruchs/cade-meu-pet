const { connectToDatabase, sql } = require("../config/database");

class Animal {
    static async criarAnimal(usuarioId, nome, idade, raca, caracteristicas, status, localizacao) {
        try {
            const pool = await connectToDatabase();
            await pool.request()
                .input("usuarioId", sql.Int, usuarioId)
                .input("nome", sql.NVarChar, nome)
                .input("idade", sql.Int, idade)
                .input("raca", sql.NVarChar, raca)
                .input("caracteristicas", sql.NVarChar, caracteristicas)
                .input("status", sql.NVarChar, status)
                .input("localizacao", sql.NVarChar, localizacao)
                .query(`INSERT INTO Animais (UsuarioID, Nome, Idade, Raca, Caracteristicas, Status, Localizacao) VALUES (@usuarioId, @nome, @idade, @raca, @caracteristicas, @status, @localizacao)`);
        } catch (error) {
            throw new Error("Erro ao criar animal: " + error.message);
        }
    }

    // Função para listar todos os animais
    static async listarAnimais() {
        try {
            const pool = await connectToDatabase();
            const result = await pool.request().query("SELECT * FROM Animais");
            return result.recordset;
        } catch (error) {
            throw new Error("Erro ao listar animais: " + error.message);
        }
    }

    static async buscarAnimalPorId(id) {
        try {
            const pool = await connectToDatabase();
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("SELECT * FROM Animais WHERE AnimalID = @id");
            return result.recordset[0];
        } catch (error) {
            throw new Error("Erro ao buscar animal por ID: " + error.message);
        }
    }

    static async atualizarAnimal(id, nome, idade, raca, caracteristicas, status, localizacao) {
        try {
            const pool = await connectToDatabase();
            const result = await pool.request()
                .input("id", sql.Int, id)
                .input("nome", sql.NVarChar, nome)
                .input("idade", sql.Int, idade)
                .input("raca", sql.NVarChar, raca)
                .input("caracteristicas", sql.NVarChar, caracteristicas)
                .input("status", sql.NVarChar, status)
                .input("localizacao", sql.NVarChar, localizacao)
                .query(`UPDATE Animais SET Nome = @nome, Idade = @idade, Raca = @raca, Caracteristicas = @caracteristicas, Status = @status, Localizacao = @localizacao WHERE AnimalID = @id`);
            return result.rowsAffected[0] > 0; // Retorna true se a atualização foi feita
        } catch (error) {
            throw new Error("Erro ao atualizar animal: " + error.message);
        }
    }

    static async excluirAnimal(id) {
        try {
            const pool = await connectToDatabase();
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("DELETE FROM Animais WHERE AnimalID = @id");
            return result.rowsAffected[0] > 0; // Retorna true se a exclusão foi feita
        } catch (error) {
            throw new Error("Erro ao excluir animal: " + error.message);
        }
    }

    // Função para buscar animais com filtros
    static async buscarComFiltros(raca, idade, status, localizacao) {
        try {
            const pool = await connectToDatabase();
            let query = "SELECT * FROM Animais WHERE 1=1";
            const inputs = {};

            if (raca) {
                query += " AND Raca = @raca";
                inputs.raca = raca;
            }
            if (idade) {
                query += " AND Idade = @idade";
                inputs.idade = idade;
            }
            if (status) {
                query += " AND Status = @status";
                inputs.status = status;
            }
            if (localizacao) {
                query += " AND Localizacao LIKE '%' + @localizacao + '%'";
                inputs.localizacao = localizacao;
            }

            const request = pool.request();
            for (const [key, value] of Object.entries(inputs)) {
                request.input(key, sql.NVarChar, value);
            }

            const result = await request.query(query);
            return result.recordset;
        } catch (error) {
            throw new Error("Erro ao buscar animais com filtros: " + error.message);
        }
    }
}

module.exports = Animal;
