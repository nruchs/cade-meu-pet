const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

const usuariosRoutes = require("./routes/usuariosRoutes");
const animaisRoutes = require("./routes/animaisRoutes");
const Animal = require("./models/Animal");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || "senha",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use((req, res, next) => {
    res.locals.usuarioAutenticado = !!req.session.usuarioId;
    next();
});

app.use((req, res, next) => {
    res.locals.mensagemSucesso = req.session.mensagemSucesso;
    res.locals.mensagemErro = req.session.mensagemErro;
    res.locals.redirectUrl = req.session.redirectUrl;
    
    delete req.session.mensagemSucesso;
    delete req.session.mensagemErro;
    delete req.session.redirectUrl;
    
    next();
});


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    try {
        const animais = await Animal.listarAnimais();
        res.render("index", { titulo: "Cadê Meu Pet?", animais });
    } catch (error) {
        console.error("Erro ao carregar a lista de animais:", error);
        res.status(500).send("Erro ao carregar a lista de animais.");
    }
});

app.use("/usuarios", usuariosRoutes);
app.use("/animais", animaisRoutes);

app.use((err, req, res, next) => {
    console.error("Erro não tratado:", err);
    res.status(500).send("Algo deu errado! Tente novamente mais tarde.");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
