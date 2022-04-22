const uuid = require('uuid');

class Room {
    constructor(name) {
        this.id = uuid.v4();
        this.name = name;
    }
}

module.exports = Room;