const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  order:       { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt:   { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
