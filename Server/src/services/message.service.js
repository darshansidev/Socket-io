const Messages = require("../models/message.model");


const getMessagesService = async (messageData) => {
    const { from, to } = messageData;

    const messages = await Messages.find({
        users: {
            $all: [from, to],
        },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
        return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
        };
    });

    return projectedMessages;

}

const addMessagesService = async (messageData) => {
    const { from, to, message } = messageData;

    const data = await Messages.create({
        message: { text: message },
        users: [from, to],
        sender: from,
    });

    return data;
}


module.exports = {
    getMessagesService,
    addMessagesService
}