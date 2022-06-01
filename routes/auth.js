var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');
var NoAuthMiddleware = require('../middlewares/NoAuthMiddleware');
const passport = require("passport");

router.post('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
});

router.use(NoAuthMiddleware);

router.get('/login', AuthController.login);
router.get('/register', AuthController.register);

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    })
);
router.post('/register', AuthController.create);



module.exports = router;