var express = require('express');
var router = express.Router();

router.route('/:id').get((req, res) => {
    res.send('get message from room by id');
}).post((req, res) => {
    res.send('send message to room by id');
});

module.exports = router;