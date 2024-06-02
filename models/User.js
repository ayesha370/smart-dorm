// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, 'Please provide an email'],
//     unique: true,
//   },
//   fullName: {
//     type: String,
//     required: [true, 'Please provide a full name'],
//   },
//   password: {
//     type: String,
//     required: [true, 'Please provide a password'],
//     select: false, // Password is excluded from queries by default
//   },
//   // You can add other fields related to the profile here
//   dateOfBirth: Date,
//   gender: String,
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
  
//   },
// });

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// const User = mongoose.model('User', userSchema);
// module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  fullName: {
    type: String,
    required: [true, 'Please provide a full name'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    //select: false, // Password is excluded from queries by default
  },
  dateOfBirth: Date,
  gender: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
    //select: false, // Password is excluded from queries by default
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
