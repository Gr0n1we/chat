const UserModel = require('../models/user');

const passport = require('passport');

exports.login = (req, res) => {
    res.render('login');
}

exports.register = (req, res) => {
    res.render('register');
}

exports.create = async (req, res) => {
    console.log(req.body);
    UserModel.register({username: req.body.username}, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect('/auth/register');
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/");
            })
        }
    })
}

exports.verify = async (req, res) => {
    console.log(req.body);
    let user =new UserModel({
        username:req.body.username,
        password:req.body.password
    })
    req.login(user, function (err){
        if (err){
            console.log(err)
            res.redirect('/auth/login');
        }else {
            passport.authenticate("local")

            (req, res, function () {
                res.redirect("/")
            });
        }
    })
}