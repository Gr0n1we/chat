function auth (req, res, next)  {
    if (req.isAuthenticated()) {
        req.isLogged = true;
        return next();
    }

    req.isLogged = false;
    return res.redirect('/auth/login');
}

module.exports = auth;