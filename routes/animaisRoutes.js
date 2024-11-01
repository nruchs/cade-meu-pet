const express = require("express");
const router = express.Router();
const animaisController = require("../controllers/animaisController");

router.post("/", animaisController.criarAnimal);
router.get("/", animaisController.listarAnimais);
router.get("/:id", animaisController.buscarAnimalPorId);
router.put("/:id", animaisController.atualizarAnimal);
router.delete("/:id", animaisController.excluirAnimal);
router.get("/editar/:id", animaisController.exibirEditarAnimal);
router.post("/editar/:id", animaisController.atualizarAnimal);


module.exports = router;
