const mongoose = require('mongoose'); // Add this line to import mongoose

const leaveRequestSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  reason: { type: String, required: true, maxlength: 25 },
  roomcode: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] }
}, { timestamps: true });

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
