const express = require("express");
const router = express.Router();
const animaisController = require("../controllers/animaisController");
const upload = require("../config/multer");

// Middleware de autenticação
function verificarAutenticacao(req, res, next) {
    if (req.session.usuarioId) {
        next(); // Usuário autenticado, prossegue
    } else {
        res.redirect("/usuarios/login"); // Redireciona para a página de login
    }
}

// Rotas protegidas
router.get("/cadastrar", verificarAutenticacao, (req, res) => {
    res.render("cadastrar", { titulo: "Cadastrar Animal" });
});

router.get("/busca", animaisController.buscarAnimaisComFiltros);
router.post("/", verificarAutenticacao, upload.single("foto"), animaisController.criarAnimal);
router.get("/", animaisController.listarAnimais);
router.get("/:id", animaisController.buscarAnimalPorId);
router.put("/:id", verificarAutenticacao, animaisController.atualizarAnimal);
router.delete("/:id", verificarAutenticacao, animaisController.excluirAnimal);
router.get("/editar/:id", verificarAutenticacao, animaisController.exibirEditarAnimal);
router.post("/editar/:id", verificarAutenticacao, animaisController.atualizarAnimal);
router.get("/detalhes/:id", animaisController.exibirDetalhesAnimal);

module.exports = router;
