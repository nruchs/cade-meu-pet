const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

// Função middleware para verificar autenticação
function verificarAutenticacao(req, res, next) {
    if (req.session.usuarioId) {
        next(); // Usuário autenticado, permite o acesso
    } else {
        res.redirect("/usuarios/login"); // Redireciona para a página de login
    }
}

// Rota para exibir a página de registro
router.get("/registrar", (req, res) => {
    res.render("registrar", { titulo: "Registrar" });
});

// Rota para exibir a página de login
router.get("/login", (req, res) => {
    res.render("login", { titulo: "Login" });
});

// Rota para registrar novo usuário (POST)
router.post("/registrar", usuariosController.registrarUsuario);

// Rota para login de usuário (POST)
router.post("/login", usuariosController.loginUsuario);

// Rota para logout de usuário
router.get("/logout", verificarAutenticacao, usuariosController.logoutUsuario);

// Rota para exibir perfil do usuário
router.get("/perfil", verificarAutenticacao, usuariosController.exibirPerfil);

// Rota para atualizar perfil do usuário
router.post("/perfil", verificarAutenticacao, usuariosController.atualizarPerfil);

module.exports = router;
