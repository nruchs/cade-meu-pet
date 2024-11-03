const Animal = require("../models/Animal");

exports.criarAnimal = async (req, res) => {
    const usuarioId = req.session.usuarioId;
    const {nome, idade, raca, caracteristicas, status, localizacao } = req.body;
    const foto = req.file ? `/uploads/${req.file.filename}` : null;

    if (!nome || !usuarioId) {
        req.session.mensagemErro = "Nome e ID do usuário são obrigatórios.";
        req.session.redirectUrl = "/animais/cadastrar";
        return res.redirect("/animais/cadastrar");
    }

    try {
        await Animal.criarAnimal(usuarioId, nome, idade, raca, caracteristicas, status, localizacao, foto);
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
    const { nome, idade, raca, caracteristicas, status, localizacao } = req.body;

    try {
        const animal = await Animal.buscarAnimalPorId(id);
        if (!animal || animal.UsuarioID !== usuarioId) {
            req.session.mensagemErro = "Acesso negado. Você não pode editar este animal.";
            req.session.redirectUrl = "/usuarios/perfil";
            return res.redirect("/usuarios/perfil");
        }

        const resultado = await Animal.atualizarAnimal(id, nome, idade, raca, caracteristicas, status, localizacao);
        if (resultado) {
            req.session.mensagemSucesso = "Animal atualizado com sucesso!";
            res.redirect("/usuarios/perfil");
        } else {
            res.status(404).send("Animal não encontrado.");
        }
    } catch (error) {
        req.session.mensagemErro = "Erro ao atualizar o animal.";
        req.session.redirectUrl = "/usuarios/perfil";
        res.redirect("/usuarios/perfil");
    }
};

exports.excluirAnimal = async (req, res) => {
    const usuarioId = req.session.usuarioId;
    const { id } = req.params;

    try {
        const animal = await Animal.buscarAnimalPorId(id);
        if (!animal || animal.UsuarioID !== usuarioId) {
            req.session.mensagemErro = "Acesso negado. Você não pode excluir este animal.";
            req.session.redirectUrl = "/usuarios/perfil";
            return res.redirect("/usuarios/perfil");
        }

        await Animal.excluirAnimal(id);
        req.session.mensagemSucesso = "Animal excluído com sucesso!";
        req.session.redirectUrl = "/usuarios/perfil";
        res.redirect("/usuarios/perfil");
    } catch (error) {
        req.session.mensagemErro = "Erro ao excluir o animal.";
        req.session.redirectUrl = "/usuarios/perfil";
        res.redirect("/usuarios/perfil");
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
            res.status(404).send("Animal não encontrado.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar o formulário de edição.");
    }
};

// Função para exibir detalhes de um animal específico
exports.exibirDetalhesAnimal = async (req, res) => {
    const { id } = req.params;
    try {
        const animal = await Animal.buscarAnimalPorId(id);
        if (animal) {
            res.render("detalhes", { titulo: "Detalhes do Animal", animal });
        } else {
            res.status(404).send("Animal não encontrado.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar os detalhes do animal.");
    }
};

// Função para buscar animais com filtros aplicados
exports.buscarAnimaisComFiltros = async (req, res) => {
    const { raca, idade, status, localizacao } = req.query;
    try {
        const animais = await Animal.buscarComFiltros(raca, idade, status, localizacao);
        res.render("resultados", { titulo: "Resultados da Busca", animais });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao buscar animais.");
    }
};
