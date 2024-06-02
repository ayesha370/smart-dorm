const mongoose = require('mongoose');
const ConfirmEmailRequestSchema = new mongoose.Schema({
    email: String,
    confirmToken: String,
    timestamp: { type: Date, default: Date.now }
});

const ConfirmEmailRequest = mongoose.model('ConfirmEmailRequest', ConfirmEmailRequestSchema);

module.exports=ConfirmEmailRequest
