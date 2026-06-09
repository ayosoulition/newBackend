const mongoose = require("mongoose");

const orderHistorySchema = new mongoose.Schema({
  id:          { type: Number, required: true },
  tableNumber: { type: Number, required: true },
  order:       { type: mongoose.Schema.Types.Mixed, default: {} },
  status:      { type: String, enum: ["paid", "cancelled"], required: true },
  serverName:  { type: String, default: "Unknown" },
  archivedAt:  { type: Date, default: Date.now },
});

module.exports = mongoose.model("OrderHistory", orderHistorySchema);
