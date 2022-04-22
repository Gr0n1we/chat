var express = require('express');
var router = express.Router();
var roomRepository = require('../repositories/room.repository');
const axios = require("axios");

router.get('/', (req, res) => {
    axios.get('https://zenquotes.io/api/quotes/')
        .then(result => {
            const count = result.data.length;
            const quote = result.data[Math.floor(Math.random()) * count];

            res.render('index', {rooms : roomRepository.getAll(), quote: quote});
        })
}).post('/', (req, res) => {
    const name = req.body.name;
    roomRepository.create(name);

    res.redirect('/');
})

router.get('/:id', (req, res) => {
    res.send(`room by id = ${req.params.id}`)
})

module.exports = router;