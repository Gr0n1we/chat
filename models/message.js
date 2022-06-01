var mongoose = require('mongoose');
const {Schema} = require("mongoose");

var schema = new Schema({
    text: {
        type: String,
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room"
    },
    authorUsername: {
        type: String,
        default: "anon"
    }
});

var message = new mongoose.model("Message", schema);

module.exports = message;