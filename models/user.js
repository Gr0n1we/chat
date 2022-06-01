var mongoose = require('mongoose');
const {Schema} = require("mongoose");
require('dotenv').config()

var schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    password : String
})

const user = new mongoose.model("User", schema);

module.exports = user;
