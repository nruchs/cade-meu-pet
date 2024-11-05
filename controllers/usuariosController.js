const Animal = require("../models/Animal");
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
    const { nome, email, senha, telefone } = req.body;
    try {
        const senhaHash = await bcrypt.hash(senha, 10); // Hash da senha com bcrypt
        await Usuario.criarUsuario(nome, email, senhaHash, telefone);
        res.redirect("/usuarios/login");
    } catch (error) {
        console.error(error);
        req.session.mensagemErro = "Erro ao registrar usuário.";
        res.redirect("/usuarios/registrar");
    }
};

// Função para autenticar um usuário
exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await Usuario.buscarUsuarioPorEmail(email);
        if (usuario && await bcrypt.compare(senha, usuario.Senha)) {
            req.session.usuarioId = usuario.UsuarioID;
            const redirectTo = req.session.redirectTo || "/usuarios/perfil";
            delete req.session.redirectTo;
            res.redirect(redirectTo);
        } else {
            req.session.mensagemErro = "Credenciais inválidas. Tente novamente.";
            req.session.redirectUrl = "/usuarios/login";
            res.redirect("/usuarios/login");
        }
    } catch (error) {
        req.session.mensagemErro = "Erro ao autenticar usuário. Cadastre-se!";
        req.session.redirectUrl = "/usuarios/registrar";
        res.redirect("/usuarios/registrar");
    }
};

// Função para encerrar a sessão do usuário
exports.logoutUsuario = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            req.session.mensagemErro = "Erro ao encerrar a sessão.";
        }
        res.redirect("/usuarios/perfil");
    });
};

exports.exibirPerfil = async (req, res) => {
    const usuarioId = req.session.usuarioId;
    try {
        const usuario = await Usuario.buscarUsuarioPorId(usuarioId);
        const animais = await Animal.listarAnimaisPorUsuario(usuarioId) || [];
        res.render("perfil", { titulo: "Meu Perfil", usuario, animais });
    } catch (error) {
        console.error(error);
        req.session.mensagemErro = "Erro ao carregar o perfil.";
        res.redirect("/");
    }
};

exports.atualizarPerfil = async (req, res) => {
    const { nome, email, senha, telefone } = req.body;
    try {
        let senhaHash = null;
        if (senha) {
            senhaHash = await bcrypt.hash(senha, 10); // Hash da nova senha, se informada
        }
        await Usuario.atualizarUsuario(req.session.usuarioId, nome, email, senhaHash, telefone);
        res.redirect("/usuarios/perfil");
    } catch (error) {
        console.error(error);
        req.session.mensagemErro = "Erro ao atualizar o perfil do usuário.";
        res.redirect("/usuarios/perfil");
    }
};