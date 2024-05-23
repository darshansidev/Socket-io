const messageService = require('../services/message.service');


const getMessages = async (req, res, next) => {
    try {
        const messageData = req.body;

        const data = await messageService.getMessagesService(messageData);

        res.json(data);

    } catch (ex) {
        next(ex)
    }
}
const addMessages = async (req, res, next) => {
    try {
        const messageData = req.body;

        const data = await messageService.addMessagesService(messageData);


        if (data) {
            return res.json({ msg: "Message added successfully." });
        }
        else {
            return res.json({ msg: "Failed to add message to the database" });
        }

    } catch (ex) {
        next(ex)
    }
}


module.exports = {
    getMessages,
    addMessages
}