module.exports = (req, res, next) => {
    if (req.session.usuarioId) {
        return next();
    } else {
        req.session.redirectTo = req.originalUrl;
        res.redirect("/usuarios/login");
    }
};