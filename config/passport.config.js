const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

async function getUserByEmail(email) {
    return await UserModel.findOne({email: email}).exec();
}

async function getUserById(id) {
    return await UserModel.findById(id).exec();
}

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);

        if (user == null)
            return done(null, false, {message: "Incorrect email or password."});

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            }
            else {
                return done(null, false, {message: "Incorrect email or password."});
            }
        } catch (e) {
            return done(e.message)
        }
    }

    passport.use(new LocalStrategy({
        usernameField : 'email'
    }, authenticateUser));

    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        return done(null, await getUserById(id));
    })
}

module.exports = initialize;