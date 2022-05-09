var express = require('express');
var router = express.Router();
var roomRepository = require('../repositories/room.repository');
const axios = require("axios");
const RoomController = require('../controllers/RoomController');

router.get('/', RoomController.findAll);

router.post('/', RoomController.create);

router.get('/:id', RoomController.findById);

module.exports = router;