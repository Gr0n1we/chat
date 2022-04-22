const Room = require('../models/room')

const rooms = [];

function create(name) {
    rooms.push(new Room(name));
}

function getAll() {
    return rooms;
}

function getById(id) {
    return rooms.find(x => x.id === id);
}

module.exports = { create, getAll, getById };