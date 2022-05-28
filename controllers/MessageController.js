const MessageModel = require('../models/message');
const RoomModel = require('../models/room');

exports.create = async (req, res) => {
    const room = RoomModel.find({_id: req.params.id})[0];
    const message = new MessageModel({
        text: req.body.text,
        room: req.params.id
    });

    console.log(message);
    await message.save();

    //room.messages.push(message.id);
    await room.save();

    res.redirect('back');
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
        const id = req.params.id;
        const message = await MessageModel.findByIdAndRemove(id);
        res.send("success");
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.update = async (req, res) => {
    try {
        const update = {text: req.body.text};
        const id = req.params.id;

        const message = await MessageModel.findByIdAndUpdate(id, update);
        res.send("success");
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.createApi = async (req, res) => {
    try {
        const id = req.params.id;
        const room = RoomModel.findById(id);
        if (!room)
            return res.status(404).json({message: "not found"});

        const message = new MessageModel({
            text: req.body.text,
            room: req.params.id
        });

        await message.save();

        //room.messages.push(message.id);
        await room.save();

        return res.status(200).json(message);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.deleteApi = async(req, res) => {
    try {
        const id = req.params.id;
        const message = await MessageModel.findByIdAndRemove(id);
        res.status(200).json({message: "success"});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.updateApi = async (req, res) => {
    try {
        const update = {text: req.body.text};
        const id = req.params.id;

        const message = await MessageModel.findByIdAndUpdate(id, update);

        res.status(200).json(message);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.findAllApi = async (req, res) => {
    try {
        const id = req.params.id;
        const candidate = RoomModel.findById(id);
        if (!candidate)
            return res.status(404).json({message: "not found"});

        const messages = await MessageModel.find({room: id});
        console.log(messages);

        res.status(200).json(messages);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}