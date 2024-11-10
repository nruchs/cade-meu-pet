const Animal = require("../models/Animal");
const Usuario = require("../models/Usuario");

exports.criarAnimal = async (req, res) => {
    const usuarioId = req.session.usuarioId;
    const { nome, idade, raca, status, localizacao, situacao, especie, genero, 
        corPredominante, dataEncontrado, dataDesaparecimento, recompensa, comentario
    } = req.body;
    const foto = req.file ? `/uploads/${req.file.filename}` : null;
    const localAtual = req.body.localAtual && req.body.localAtual !== "" ? req.body.localAtual : null;
    const porte = req.body.porte && req.body.porte !== "" ? req.body.porte : null;
    const cuidadosVeterinarios = req.body.cuidadosVeterinarios && req.body.cuidadosVeterinarios.length > 0 ? req.body.cuidadosVeterinarios.join(', ') : null;
    const temperamento = req.body.temperamento && req.body.temperamento.length > 0 ? req.body.temperamento.join(', ') : null;
    const adaptabilidade = req.body.adaptabilidade && req.body.adaptabilidade.length > 0 ? req.body.adaptabilidade.join(', ') : null;
    const socializacao = req.body.socializacao && req.body.socializacao.length > 0 ? req.body.socializacao.join(', ') : null;

    if (!nome || !usuarioId) {
        req.session.mensagemErro = "Nome e ID do usuário são obrigatórios.";
        req.session.redirectUrl = "/animais/cadastrar";
        return res.redirect("/animais/cadastrar");
    }

    try {
        await Animal.criarAnimal(usuarioId, nome, idade, raca, status, localizacao, foto, situacao, especie, genero, 
            porte, corPredominante, localAtual, cuidadosVeterinarios,
            temperamento, adaptabilidade, socializacao, dataEncontrado, dataDesaparecimento, recompensa, comentario);
            console.log({
                nome, idade, raca, status, localizacao, situacao, especie, genero,
                porte, corPredominante, localAtual, cuidadosVeterinarios,
                temperamento, adaptabilidade, socializacao, dataEncontrado, dataDesaparecimento, recompensa, comentario
            });
        req.session.mensagemSucesso = "Animal cadastrado com sucesso!";
        req.session.redirectUrl = "/usuarios/perfil"; // URL para redirecionar após sucesso
        res.redirect("/usuarios/perfil");
    } catch (error) {
        req.session.mensagemErro = "Erro ao cadastrar animal. Tente novamente.";
        req.session.redirectUrl = "/animais/cadastrar";
        res.redirect("/animais/cadastrar");
    }
};

// Função para listar todos os animais
exports.listarAnimais = async (req, res) => {
    try {
        const animais = await Animal.listarAnimais();
        res.status(200).json(animais);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao listar animais.");
    }
};

exports.buscarAnimalPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const animal = await Animal.buscarAnimalPorId(id);
        if (animal) {
            res.status(200).json(animal);
        } else {
            res.status(404).send("Animal não encontrado.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar animal.");
    }
};

exports.atualizarAnimal = async (req, res) => {
    const usuarioId = req.session.usuarioId;
    const { id } = req.params;
    const foto = req.file ? `/uploads/${req.file.filename}` : null;
    const { nome, idade, raca, status, localizacao, situacao, especie, genero, 
            porte, corPredominante, localAtual, dataEncontrado, dataDesaparecimento, recompensa, comentario } = req.body;
    
    const cuidadosVeterinarios = req.body.cuidadosVeterinarios && req.body.cuidadosVeterinarios.length > 0 ? req.body.cuidadosVeterinarios.join(', ') : null;
    const temperamento = req.body.temperamento && req.body.temperamento.length > 0 ? req.body.temperamento.join(', ') : null;
    const adaptabilidade = req.body.adaptabilidade && req.body.adaptabilidade.length > 0 ? req.body.adaptabilidade.join(', ') : null;
    const socializacao = req.body.socializacao && req.body.socializacao.length > 0 ? req.body.socializacao.join(', ') : null;

    console.log({
        nome, idade, raca, status, localizacao, situacao, especie, genero,
        porte, corPredominante, localAtual, cuidadosVeterinarios,
        temperamento, adaptabilidade, socializacao, dataEncontrado, dataDesaparecimento, recompensa, comentario
    });

    console.log("Dados recebidos:", req.body);

    try {
        const animal = await Animal.buscarAnimalPorId(id);
        if (!animal || animal.UsuarioID !== usuarioId) {
            req.session.mensagemErro = "Acesso negado. Você não pode editar este animal.";
            req.session.redirectUrl = "/usuarios/perfil";
            return res.redirect("/usuarios/perfil");
        }

        const resultado = await Animal.atualizarAnimal(id, usuarioId, nome, idade, raca, status, localizacao, foto, situacao, especie, genero, 
            porte, corPredominante, localAtual, cuidadosVeterinarios,
            temperamento, adaptabilidade, socializacao, dataEncontrado, dataDesaparecimento, recompensa, comentario);
        
        if (resultado) {
            req.session.mensagemSucesso = "Animal atualizado com sucesso!";
            res.redirect("/usuarios/perfil");
            
        } else {
            req.session.mensagemErro = "Animal não encontrado.";
            req.session.redirectUrl = "/usuarios/perfil";
            res.redirect("/usuarios/perfil");
        }
    } catch (error) {
        req.session.mensagemErro = "Erro ao atualizar o animal.";
        req.session.redirectUrl = "/usuarios/perfil";
        res.redirect("/usuarios/perfil");
        console.error("Erro ao atualizar o animal:", error.message);
        res.status(500).send("Erro ao atualizar o animal. Verifique o console para mais detalhes.");
    }
};

exports.excluirAnimal = async (req, res) => {
    const usuarioId = req.session.usuarioId;
    const { id } = req.params;

    try {
        const animal = await Animal.buscarAnimalPorId(id);
        if (!animal || animal.UsuarioID !== usuarioId) {
            console.error("Acesso negado ao tentar excluir o animal:", id);
            return res.status(403).json({ mensagemErro: "Acesso negado. Você não pode excluir este animal." });
        }

        await Animal.excluirAnimal(id);
        return res.status(200).json({ mensagemSucesso: "Animal excluído com sucesso." });
    } catch (error) {
        console.error("Erro ao excluir o animal:", error.message);
        return res.status(500).json({ mensagemErro: "Erro ao excluir o animal." });
    }
};

// Função para exibir o formulário de edição de um animal
exports.exibirEditarAnimal = async (req, res) => {
    const { id } = req.params;
    try {
        const animal = await Animal.buscarAnimalPorId(id);
        if (animal) {
            res.render("editar", { titulo: "Editar Animal", animal });
        } else {
            req.session.mensagemErro = "Animal não encontrado.";
        }
    } catch (error) {
        console.error(error);
        req.session.mensagemErro = "Erro ao carregar o formulário de edição.";
    }
};

// Função para exibir detalhes de um animal específico
exports.exibirDetalhesAnimal = async (req, res) => {
    const { id } = req.params;
    try {
        const animal = await Animal.buscarAnimalPorId(id);
        if (animal) {
            const usuario = await Usuario.buscarUsuarioPorId(animal.UsuarioID);

        res.render('detalhes', { 
            titulo: 'Detalhes do Animal',
            animal,
            usuario,
            googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY 
        });
        } else {
            req.session.mensagemErro = "Animal não encontrado.";
        }
    } catch (error) {
        console.error(error);
        req.session.mensagemErro = "Erro ao carregar os detalhes do animal.";
    }
};


// Função para buscar animais com filtros aplicados
exports.buscarAnimaisComFiltros = async (req, res) => {
    const { raca, idade, status, localizacao, especie, genero, porte, situacao, offset = 0 } = req.query;
    const usuarioId = req.session.usuarioId;
    const limit = 6;

    try {
        const animais = await Animal.buscarComFiltros(
            raca, idade, status, localizacao, especie, genero, porte, situacao, parseInt(offset), limit
        );

        const totalAnimais = await Animal.contarComFiltros(raca, idade, status, localizacao, especie, genero, porte, situacao);
        
        const animaisComIsOwner = animais.map(animal => ({
            ...animal,
            isOwner: animal.UsuarioID === usuarioId
        }));

        const hasMore = (parseInt(offset) + limit) < totalAnimais;

        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return res.json({ animais: animaisComIsOwner, hasMore });
        }

        res.render("index", { titulo: "Cadê Meu Pet?", animais: animaisComIsOwner, hasMore });
    } catch (error) {
        console.error("Erro ao buscar animais:", error);

        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return res.status(500).json({ error: "Erro ao buscar animais." });
        }

        req.session.mensagemErro = "Erro ao buscar animais.";
        res.redirect("/");
    }
};

// Função para listar animais com paginação
exports.listarAnimaisComPaginacao = async (req, res) => {
    const usuarioId = req.session.usuarioId;
    const offset = parseInt(req.query.offset) || 0;
    const limit = 6;

    try {
        const animais = await Animal.buscarComPaginacao(offset, limit);

        const animaisComIsOwner = animais.map(animal => ({
            ...animal,
            isOwner: animal.UsuarioID === usuarioId
        }));

        const totalAnimais = await Animal.contarTodos();
        const hasMore = (offset + limit) < totalAnimais; 
        res.render("index", { titulo: "Cadê Meu Pet?", animais: animaisComIsOwner, hasMore });
    } catch (error) {
        console.error("Erro ao listar animais com paginação:", error);
        res.status(500).send("Erro ao listar animais.");
    }
};
