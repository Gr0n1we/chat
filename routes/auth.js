var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');
const passport = require("passport");

router.post('/login', AuthController.verify);
router.post('/register', AuthController.create);

router.get("/google", passport.authenticate('google', {scope: ["profile"]}), (req, res) => {
    console.log("123123123");
});

router.get('/google/osekter',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;