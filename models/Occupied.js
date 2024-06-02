const mongoose = require('mongoose');

const occupiedSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    
    roomcode: {
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
    }
});

const Occupied = mongoose.model('Occupied', occupiedSchema);

module.exports = Occupied;
