const Animal = require("../models/Animal");

exports.criarAnimal = async (req, res) => {
    const usuarioId = req.session.usuarioId;
    const {nome, idade, raca, caracteristicas, status, localizacao } = req.body;
    const foto = req.file ? `/uploads/${req.file.filename}` : null;

    if (!nome || !usuarioId) {
        req.session.mensagemErro = "Nome e ID do usuário são obrigatórios.";
        return res.redirect("/animais/cadastrar"); // Redireciona para o formulário em caso de erro
    }

    try {
        await Animal.criarAnimal(usuarioId, nome, idade, raca, caracteristicas, status, localizacao, foto);
        req.session.mensagemSucesso = "Animal cadastrado com sucesso!";
        res.redirect("/");
    } catch (error) {
        req.session.mensagemErro = "Erro ao cadastrar animal. Tente novamente.";
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
    const { id } = req.params;
    const { nome, idade, raca, caracteristicas, status, localizacao } = req.body;
    try {
        const resultado = await Animal.atualizarAnimal(id, nome, idade, raca, caracteristicas, status, localizacao);
        if (resultado) {
            res.status(200).send("Animal atualizado com sucesso!");
            res.redirect("/"); 
        } else {
            res.status(404).send("Animal não encontrado.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar animal.");
    }
};

exports.excluirAnimal = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await Animal.excluirAnimal(id);
        if (resultado) {
            res.status(200).send("Animal excluído com sucesso!");
        } else {
            res.status(404).send("Animal não encontrado.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao excluir animal.");
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
