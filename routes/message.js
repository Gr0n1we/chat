var express = require('express');
var router = express.Router();
var MessageController = require('../controllers/MessageController');

router.delete('/:id', MessageController.delete);
router.patch('/:id', MessageController.update);

module.exports = router;