const MessageModel = require('../models/message');
const RoomModel = require('../models/room');

exports.create = async (req, res) => {
    const room = RoomModel.find({_id: req.params.id})[0];
    const message = new MessageModel({
        text: req.body.text,
        room: req.params.id
    });

    console.log(message);
    await message.save().then(data => {
        res.redirect('back');
    })
}

exports.findAll = async (req, res) => {
    const room = await RoomModel.find({_id: req.params.id}).populate("messages");
    const messages = await MessageModel.find({room: req.params.id});

    console.log(typeof (room[0]));
    console.log(room[0]);
    //console.log(room[0].name);

    res.render('room', {room: room[0], messages: messages});
}

exports.delete = async (req, res) => {
    try {
        const message = await MessageModel.findOneAndRemove({id: req.params.id});
        res.send("success");
    } catch (e) {
        res.status(500).json({message : e.message});
    }
}

exports.update = async (req, res) => {
    try {
        const update = {text : req.body.text};
        const id = req.params.id;

        const message = await MessageModel.findOneAndUpdate({id: id}, update);
        res.send("success");
    } catch (e) {
        res.status(500).json({message : e.message});
    }
}