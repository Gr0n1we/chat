var mongoose = require('mongoose');
const {Schema} = require("mongoose");
require('dotenv').config()

const passportLocalMongoose=require('passport-local-mongoose')
const passport=require('passport')

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')

var schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    googleId : String
})

schema.plugin(passportLocalMongoose);
schema.plugin(findOrCreate);
var user = new mongoose.model("User", schema);

/*passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())*/

passport.serializeUser(function (user, done) {
    done(null, user.id)
})
passport.deserializeUser(function (id, done) {
    user.findById(id, function (err, user) {
        done(err,user)
    })
})

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "https://chat-webka.herokuapp.com/auth/google/osekter"
    },
    function(accessToken, refreshToken, profile, cb) {
        user.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

module.exports = user;
