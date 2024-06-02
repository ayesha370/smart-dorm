// Chat schema and model
const mongoose = require('mongoose');
const ChatSchema = new mongoose.Schema({
    senderEmail: String,
    receiverEmail: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const ChatMessage = mongoose.model('ChatMessage', ChatSchema);

module.exports=ChatMessage
