const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

// Função middleware para verificar autenticação
function verificarAutenticacao(req, res, next) {
    if (req.session.usuarioId) {
        next(); // Usuário autenticado, permite o acesso
    } else {
        res.redirect("/login"); // Redireciona para a página de login
    }
}

router.post("/", usuariosController.criarUsuario);

router.post("/registrar", usuariosController.registrarUsuario);
router.post("/login", usuariosController.loginUsuario);
router.get("/logout", verificarAutenticacao, usuariosController.logoutUsuario);

router.get("/perfil", verificarAutenticacao, usuariosController.exibirPerfil);
router.post("/perfil", verificarAutenticacao, usuariosController.atualizarPerfil);

module.exports = router;
