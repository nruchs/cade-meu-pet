const Animal = require("../models/Animal");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

exports.criarUsuario = async (req, res) => {
    const { nome, email, senha, telefone } = req.body;
    try {
        await Usuario.criarUsuario(nome, email, senha, telefone);
        res.status(201).send("Usuário cadastrado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar usuário.");
    }
};

exports.registrarUsuario = async (req, res) => {
    const { nome, email, senha, telefone } = req.body;

    if (!nome || !email || !senha || !telefone) {
        req.session.mensagemErro = "Todos os campos são obrigatórios e devem estar em formato válido.";
        return res.redirect("/usuarios/registrar");
    }

    const telefoneNumerico = telefone.replace(/\D/g, '');
    const isCelularValido = telefoneNumerico.length === 11 && telefoneNumerico[2] === '9';
    const isFixoValido = telefoneNumerico.length === 10 && telefoneNumerico[2] !== '9';

    if (!isCelularValido && !isFixoValido) {
        req.session.mensagemErro = "Insira um telefone válido no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.";
        return
    }

    try {
        const senhaHash = await bcrypt.hash(senha, 10); // Hash da senha com bcrypt
        await Usuario.criarUsuario(nome.trim(), email.trim(), senhaHash, telefone.trim());
        res.redirect("/usuarios/login");
    } catch (error) {
        console.error(error);
        req.session.mensagemErro = "Erro ao registrar usuário.";
        res.redirect("/usuarios/registrar");
    }
};

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
    if (!nome || !email || !telefone) {
        req.session.mensagemErro = "Nome, e-mail e telefone são obrigatórios para atualizar o perfil.";
        return res.redirect("/usuarios/perfil");
    }
    try {
        let senhaHash = null;
        if (senha) {
            senhaHash = await bcrypt.hash(senha, 10);
        }
        await Usuario.atualizarUsuario(req.session.usuarioId, nome.trim(), email.trim(), senhaHash, telefone.trim());
        req.session.mensagemSucesso = "Perfil atualizado com sucesso!";
        res.redirect("/usuarios/perfil");
    } catch (error) {
        console.error(error);
        req.session.mensagemErro = "Erro ao atualizar o perfil do usuário.";
        res.redirect("/usuarios/perfil");
    }
};