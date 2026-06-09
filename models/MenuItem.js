const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  id:          { type: Number, required: true, unique: true },
  title:       { type: String, required: true },
  description: { type: String, default: "" },
  img:         { type: String, default: "" },
  type:        { type: String, required: true },
  price:       { type: Number, required: true },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
