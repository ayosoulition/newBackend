const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id:       { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["admin", "serveur", "caisse"], required: true },
});

module.exports = mongoose.model("User", userSchema);
