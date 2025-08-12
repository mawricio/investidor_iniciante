const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String },
  role: { type: String, enum: ['admin','editor','user'], default: 'admin' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
