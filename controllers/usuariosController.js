const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

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

// Função para registrar um novo usuário
exports.registrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const senhaHash = await bcrypt.hash(senha, 10); // Hash da senha com bcrypt
        await Usuario.criarUsuario(nome, email, senhaHash);
        res.redirect("/usuarios/login");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao registrar usuário.");
    }
};

// Função para autenticar um usuário
exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await Usuario.buscarUsuarioPorEmail(email);
        if (usuario && await bcrypt.compare(senha, usuario.Senha)) {
            req.session.usuarioId = usuario.UsuarioID;
            res.redirect("/usuarios/perfil");
        } else {
            res.status(401).send("Credenciais inválidas.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao autenticar usuário.");
    }
};

// Função para encerrar a sessão do usuário
exports.logoutUsuario = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Erro ao encerrar a sessão.");
        }
        res.redirect("/usuarios/login");
    });
};

exports.exibirPerfil = async (req, res) => {
    try {
        const usuario = await Usuario.buscarUsuarioPorId(req.session.usuarioId);
        res.render("perfil", { titulo: "Meu Perfil", usuario });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar o perfil do usuário.");
    }
};

exports.atualizarPerfil = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        let senhaHash = null;
        if (senha) {
            senhaHash = await bcrypt.hash(senha, 10); // Hash da nova senha, se informada
        }
        await Usuario.atualizarUsuario(req.session.usuarioId, nome, email, senhaHash);
        res.redirect("/usuarios/perfil");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar o perfil do usuário.");
    }
};