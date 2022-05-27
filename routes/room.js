var express = require('express');
var router = express.Router();
//var roomRepository = require('../repositories/room.repository');
const axios = require("axios");
const RoomController = require('../controllers/RoomController');
const MessageController = require('../controllers/MessageController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.get('/', [AuthMiddleware], RoomController.findAll);
router.post('/', RoomController.create);
router.get('/:id', MessageController.findAll);
router.post('/:id', MessageController.create);
router.delete('/:id', RoomController.delete);
router.patch('/:id', RoomController.update);

module.exports = router;