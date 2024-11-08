const { connectToDatabase, sql } = require("../config/database");

class Animal {
    static async criarAnimal(usuarioId, nome, idade, raca, caracteristicas, status, localizacao, foto, situacao, especie, genero, 
        porte, corPredominante, localAtual, historia, cuidadosVeterinarios,
        temperamento, adaptabilidade, socializacao, dataEncontrado, dataDesaparecimento, recompensa) {
        try {
            const pool = await connectToDatabase();
            const dataEncontradoValida = dataEncontrado ? new Date(dataEncontrado) : null;
            const dataDesaparecimentoValida = dataDesaparecimento ? new Date(dataDesaparecimento) : null;
            const recompensaValida = recompensa ? parseFloat(recompensa) : null;

            await pool.request()
                .input("usuarioId", sql.Int, usuarioId)
                .input("nome", sql.NVarChar, nome)
                .input("idade", sql.Int, idade)
                .input("raca", sql.NVarChar, raca)
                .input("caracteristicas", sql.NVarChar, caracteristicas)
                .input("status", sql.NVarChar, status)
                .input("localizacao", sql.NVarChar, localizacao)
                .input("foto", sql.NVarChar, foto)
                .input("situacao", sql.NVarChar, situacao)
                .input("especie", sql.NVarChar, especie)
                .input("genero", sql.NVarChar, genero)
                .input("porte", sql.NVarChar, porte)
                .input("corPredominante", sql.NVarChar, corPredominante)
                .input("localAtual", sql.NVarChar, localAtual)
                .input("historia", sql.Text, historia)
                .input("cuidadosVeterinarios", sql.NVarChar(sql.MAX), cuidadosVeterinarios)
                .input("temperamento", sql.NVarChar(sql.MAX), temperamento)
                .input("adaptabilidade", sql.NVarChar(sql.MAX), adaptabilidade)
                .input("socializacao", sql.NVarChar(sql.MAX), socializacao)
                .input("dataEncontrado", sql.Date, dataEncontradoValida)
                .input("dataDesaparecimento", sql.Date, dataDesaparecimentoValida)
                .input("recompensa", sql.Decimal(10, 2), recompensaValida)
                .query(`
                    INSERT INTO Animais (
                        UsuarioID, Nome, Idade, Raca, Caracteristicas, Status, Localizacao, Foto,
                        Situacao, Especie, Genero, Porte, CorPredominante, LocalAtual, Historia, CuidadosVeterinarios, Temperamento, Adaptabilidade,
                        Socializacao, DataEncontrado, DataDesaparecimento, Recompensa
                    ) VALUES (
                        @usuarioId, @nome, @idade, @raca, @caracteristicas, @status, @localizacao, @foto,
                        @situacao, @especie, @genero, @porte, @corPredominante, @localAtual, @historia, @cuidadosVeterinarios, @temperamento, @adaptabilidade,
                        @socializacao, @dataEncontrado, @dataDesaparecimento, @recompensa
                    )
                `);
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

    static async atualizarAnimal(id, usuarioId, nome, idade, raca, caracteristicas, status, localizacao, foto, situacao, especie, genero, 
        porte, corPredominante, localAtual, historia, cuidadosVeterinarios, temperamento, adaptabilidade, socializacao, dataEncontrado, dataDesaparecimento, recompensa) {
        try {
            const pool = await connectToDatabase();
            
            const dataEncontradoValida = dataEncontrado ? new Date(dataEncontrado) : null;
            const dataDesaparecimentoValida = dataDesaparecimento ? new Date(dataDesaparecimento) : null;
            const recompensaValida = recompensa ? parseFloat(recompensa) : null;
            
            await pool.request()
                .input("id", sql.Int, id)
                .input("usuarioId", sql.Int, usuarioId)
                .input("nome", sql.NVarChar, nome)
                .input("idade", sql.Int, idade)
                .input("raca", sql.NVarChar, raca)
                .input("caracteristicas", sql.NVarChar, caracteristicas)
                .input("status", sql.NVarChar, status)
                .input("localizacao", sql.NVarChar, localizacao)
                .input("foto", sql.NVarChar, foto)
                .input("situacao", sql.NVarChar, situacao)
                .input("especie", sql.NVarChar, especie)
                .input("genero", sql.NVarChar, genero)
                .input("porte", sql.NVarChar, porte)
                .input("corPredominante", sql.NVarChar, corPredominante)
                .input("localAtual", sql.NVarChar, localAtual || null)
                .input("historia", sql.Text, historia || null)
                .input("cuidadosVeterinarios", sql.NVarChar(sql.MAX), cuidadosVeterinarios || null)
                .input("temperamento", sql.NVarChar(sql.MAX), temperamento || null)
                .input("adaptabilidade", sql.NVarChar(sql.MAX), adaptabilidade || null)
                .input("socializacao", sql.NVarChar(sql.MAX), socializacao || null)
                .input("dataEncontrado", sql.Date, dataEncontradoValida)
                .input("dataDesaparecimento", sql.Date, dataDesaparecimentoValida)
                .input("recompensa", sql.Decimal(10, 2), recompensaValida)
                .query(`
                    UPDATE Animais 
                    SET UsuarioID = @usuarioId, Nome = @nome, Idade = @idade, Raca = @raca, Caracteristicas = @caracteristicas, 
                        Status = @status, Localizacao = @localizacao, Foto = @foto, Situacao = @situacao, Especie = @especie, 
                        Genero = @genero, Porte = @porte, CorPredominante = @corPredominante, LocalAtual = @localAtual, 
                        Historia = @historia, CuidadosVeterinarios = @cuidadosVeterinarios, Temperamento = @temperamento, 
                        Adaptabilidade = @adaptabilidade, Socializacao = @socializacao, DataEncontrado = @dataEncontrado, 
                        DataDesaparecimento = @dataDesaparecimento, Recompensa = @recompensa
                    WHERE AnimalID = @id
                `);
            
            return true; // Retorna true se a atualização foi feita com sucesso
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

    static async listarAnimaisPorUsuario(usuarioId) {
        try {
            const pool = await connectToDatabase();
            const result = await pool.request()
                .input("usuarioId", sql.Int, usuarioId)
                .query("SELECT * FROM Animais WHERE UsuarioID = @usuarioId");
            return result.recordset;
        } catch (error) {
            throw new Error("Erro ao listar animais do usuário: " + error.message);
        }
    }    

    // Função para buscar animais com filtros
    static async buscarComFiltros(raca, idade, status, localizacao, especie, genero, porte, situacao, offset = 0, limit = 6) {
        try {
            const pool = await connectToDatabase();
            let query = "SELECT * FROM Animais WHERE 1=1";
            const inputs = {};
    
            // Adicionando filtros de busca
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
            if (especie) {
                query += " AND Especie = @especie";
                inputs.especie = especie;
            }
            if (genero) {
                query += " AND Genero = @genero";
                inputs.genero = genero;
            }
            if (porte) {
                query += " AND Porte = @porte";
                inputs.porte = porte;
            }
            if (situacao) {
                query += " AND Situacao = @situacao";
                inputs.situacao = situacao;
            }
    
            // Ordenação e paginação
            query += " ORDER BY DataCadastro DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY";
    
            const request = pool.request();
            for (const [key, value] of Object.entries(inputs)) {
                request.input(key, sql.NVarChar, value);
            }
            request.input("offset", sql.Int, offset);
            request.input("limit", sql.Int, limit);
    
            const result = await request.query(query);
            return result.recordset;
        } catch (error) {
            throw new Error("Erro ao buscar animais com filtros: " + error.message);
        }
    }
} 

module.exports = Animal;
