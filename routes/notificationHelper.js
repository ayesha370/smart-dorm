// notificationHelper.js
const Notification = require('../models/Notification');
const User = require('../models/User');

async function sendNotificationToAdmins(message) {
    const admins = await User.find({ role: 'admin' });
    admins.forEach(async admin => {
        const notification = new Notification({ recipientEmail: admin.email, message });
        await notification.save();
    });
}

async function sendNotificationToUser(userEmail, message) {
    const notification = new Notification({ recipientEmail: userEmail, message });
    await notification.save();
}

module.exports = { sendNotificationToAdmins, sendNotificationToUser };
