const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "https://i.pravatar.cc/150?img=12" } // Default avatar
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);