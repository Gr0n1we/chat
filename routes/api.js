var express = require('express');
var router = express.Router();
const axios = require("axios");
const RoomController = require('../controllers/RoomController');
const MessageController = require('../controllers/MessageController');


router.get('/rooms', RoomController.findAllApi);
router.post('/rooms', RoomController.createApi);
router.delete('/rooms/:id', RoomController.deleteApi);
router.patch('/rooms/:id', RoomController.updateApi);

router.get('/rooms/:id', MessageController.findAllApi);
router.post('/rooms/:id', MessageController.createApi);

router.delete('/messages/:id', MessageController.deleteApi);
router.patch('/messages/:id', MessageController.updateApi);

module.exports = router;