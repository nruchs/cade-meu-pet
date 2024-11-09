const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const verificarAutenticacao = require("../middlewares/autenticacao");

router.get("/registrar", (req, res) => {
    res.render("registrar", { titulo: "Registrar" });
});

router.get("/login", (req, res) => {
    res.render("login", { titulo: "Login" });
});

router.post("/registrar", usuariosController.registrarUsuario);
router.post("/login", usuariosController.loginUsuario);
router.get("/logout", verificarAutenticacao, usuariosController.logoutUsuario);
router.get("/perfil", verificarAutenticacao, usuariosController.exibirPerfil);
router.post("/perfil", verificarAutenticacao, usuariosController.atualizarPerfil);

module.exports = router;
