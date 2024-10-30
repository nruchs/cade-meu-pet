const Animal = require("../models/Animal");

exports.criarAnimal = async (req, res) => {
    const { usuarioId, nome, idade, raca, caracteristicas, status, localizacao } = req.body;
    try {
        await Animal.criarAnimal(usuarioId, nome, idade, raca, caracteristicas, status, localizacao);
        res.status(201).send("Animal cadastrado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar animal.");
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
