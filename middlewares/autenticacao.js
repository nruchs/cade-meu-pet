module.exports = (req, res, next) => {
    if (req.session.usuarioId) {
        return next(); // Usuário autenticado, prossegue
    } else {
        // Salva a URL original que o usuário tentou acessar
        req.session.redirectTo = req.originalUrl;
        res.redirect("/usuarios/login"); // Redireciona para a página de login
    }
};