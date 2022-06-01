const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    res.render('login');
}

exports.register = (req, res) => {
    res.render('register');
}

exports.create = async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);

    try {
        const user = new UserModel({
            email: email,
            password: hashedPassword,
            username: username
        });

        await user.save();
    } catch (e) {
        console.log(e.message);
        return res.redirect('/auth/register');
    }

    return res.redirect('/auth/login');
}