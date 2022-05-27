function auth (req, res, next)  {
    if (req.isAuthenticated()) {
        console.log("MIDDLEWARE");
        req.isLogged = true;
        return next();
    }


    return res.redirect('/');
}

module.exports = auth;