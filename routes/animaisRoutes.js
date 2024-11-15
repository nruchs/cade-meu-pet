const express = require("express");
const router = express.Router();
const animaisController = require("../controllers/animaisController");
const verificarAutenticacao = require("../middlewares/autenticacao");
const upload = require("../config/multer");

router.get("/cadastrar", verificarAutenticacao, (req, res) => {
    res.render("cadastrar", { titulo: "Cadastrar Animal" });
});

router.get("/busca", animaisController.buscarAnimaisComFiltros);
router.post("/", verificarAutenticacao, upload.single("foto"), animaisController.criarAnimal);
router.get("/", animaisController.listarAnimaisComPaginacao);
router.get("/:id", animaisController.buscarAnimalPorId);
router.put("/:id", verificarAutenticacao, animaisController.atualizarAnimal);
router.delete("/:id", verificarAutenticacao, animaisController.excluirAnimal);
router.get("/editar/:id", verificarAutenticacao, animaisController.exibirEditarAnimal);
router.post("/editar/:id", verificarAutenticacao, upload.single("foto"), animaisController.atualizarAnimal);
router.get("/detalhes/:id", animaisController.exibirDetalhesAnimal);
module.exports = router;
