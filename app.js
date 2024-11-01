const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const usuariosRoutes = require("./routes/usuariosRoutes");
const animaisRoutes = require("./routes/animaisRoutes");
const Animal = require("./models/Animal");

const app = express();
app.use(bodyParser.json());

// Configurar o EJS como template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configurar arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rota principal para renderizar a página inicial com a lista de animais
app.get("/", async (req, res) => {
    try {
        const animais = await Animal.listarAnimais(); // Busca a lista de animais
        res.render("index", { titulo: "Cadê Meu Pet?", animais }); // Passa a lista para a view
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar a lista de animais.");
    }
});
// Rota para a página de cadastro de animais
app.get("/cadastrar", (req, res) => {
    res.render("cadastrar", { titulo: "Cadastrar Animal" });
});

// Usando as rotas para usuários e animais
app.use("/usuarios", usuariosRoutes);
app.use("/animais", animaisRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
