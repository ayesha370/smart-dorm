const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  roomcode: { type: String, required: true },
  lostfoundDate: { type: Date, required: true },
  itemInfo: { type: String, required: true },
  status: { type: String, required: true, enum: ['lost', 'found', 'not-found'] }
}, { timestamps: true });

module.exports = mongoose.model('LostFoundItem', lostFoundSchema);
