
const mongoose = require('mongoose');

const roomAllocationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  
  roomType: {
    type: String,
    enum: ['single', 'double', 'three-seater'],
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  additionalRequest: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
}
  // Include any other fields as per your requirement
});

const RoomAllocation = mongoose.model('RoomAllocation', roomAllocationSchema);

module.exports = RoomAllocation;
