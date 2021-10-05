const mongoose = require("mongoose")

const purchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user" },
  article: { type: mongoose.Types.ObjectId, ref: "article" },
  isConfirmed: { type: Boolean, default: false }, // revisar.
  wasDelivered: { type: Boolean, default: false },
  paymentMethod: { type: String, required: true },
  logs: [{ type: String }],
  timestamp: { type: Date, default: Date.now() },
})

const Purchase = mongoose.model("purchase", purchaseSchema)

module.exports = Purchase
