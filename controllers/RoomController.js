const RoomModel = require('../models/room');
const axios = require("axios");

exports.create = async (req, res) => {
    const room = new RoomModel({
        name: req.body.name
    });

    await room.save().then(data => {
        res.redirect('/');
    })
}

exports.findAll = async (req, res) => {
    try {
        const room = await RoomModel.find();
        axios.get('https://zenquotes.io/api/quotes/')
            .then(result => {
                const count = result.data.length;
                const quote = result.data[Math.floor(Math.random()) * count];

                res.render('index', {rooms: room, quote: quote});
            });
    } catch (e) {
        res.status(404).json({message: e.message});
    }
}

exports.findById = async (req, res) => {
    try {
        const room = await RoomModel.findById(req.params.id);
        res.status(200).json(room);
    } catch (e) {
        res.status(404).json({message: e.message});
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await RoomModel.findOneAndRemove({id: id});
        res.send("success")
    } catch (e ) {
        res.status(500).json({message : e.message});
    }
}

exports.update = async (req, res) => {
    try {
        const update = { name: req.body.name };
        const id = req.params.id;
        const room = await RoomModel.findOneAndUpdate({id: id}, update);

        res.send("success");
    } catch (e ) {
        res.status(500).json({message : e.message});
    }
}