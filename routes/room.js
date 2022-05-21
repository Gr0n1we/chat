var express = require('express');
var router = express.Router();
//var roomRepository = require('../repositories/room.repository');
const axios = require("axios");
const RoomController = require('../controllers/RoomController');

router.get('/', RoomController.findAll);

router.post('/rooms', RoomController.create);

router.get('/rooms/:id', RoomController.findById);

router.delete('/rooms/:id', RoomController.delete);

router.patch('/rooms/:id', RoomController.update);

module.exports = router;