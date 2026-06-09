const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  id:         { type: Number, required: true, unique: true },
  status:     { type: String, enum: ["empty", "ordered", "confirmed", "ready", "notPayed", "bill"], default: "empty" },
  serverName: { type: String, default: null },
  serverId:   { type: Number, default: null },
});

module.exports = mongoose.model("Table", tableSchema);
