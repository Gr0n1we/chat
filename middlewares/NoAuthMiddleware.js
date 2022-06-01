function noAuth(req, res, next) {
    if (req.isAuthenticated())
    {
        req.isLogged = true;
        return res.redirect('/');
    }

    req.isLogged = false;
    return next();
}

module.exports = noAuth;