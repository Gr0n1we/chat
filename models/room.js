var mongoose = require('mongoose');
const {Schema} = require("mongoose");

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }],
    authorUsername: {
        type: String,
        default: "anon"
    }
})

var room = new mongoose.model("Room", schema);

module.exports = room;

/*
const uuid = require('uuid');

class Room {
    constructor(name) {
        this.id = uuid.v4();
        this.name = name;
    }
}

module.exports = Room;*/
