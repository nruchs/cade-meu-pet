const Usuario = require("../models/Usuario");

exports.criarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        await Usuario.criarUsuario(nome, email, senha);
        res.status(201).send("Usuário cadastrado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar usuário.");
    }
};
