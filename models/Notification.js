// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipientEmail: String,
    message: String,
    readStatus: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
