const mongoose = require('mongoose');
const ResetPasswordRequestSchema = new mongoose.Schema({
    email: String,
    resetToken: String,
    timestamp: { type: Date, default: Date.now }
});

const ResetPasswordRequest = mongoose.model('ResetPasswordRequest', ResetPasswordRequestSchema);

module.exports=ResetPasswordRequest
