const mongoose = require("mongoose")

const purchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user" },
  articles: [{ type: mongoose.Types.ObjectId, ref: "article" }],
  direction: 
    {
      receiver:{type:String, required:true},
      street: { type: String, required: true },
      number: { type: Number, required: true },
      department: { type: String, required: true },
      zipCode: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
  isConfirmed: { type: Boolean, default: false }, // revisar.
  wasDelivered: { type: Boolean, default: false },
  paymentMethod: { type: String, required: true },
  logs: [{ type: String }],
  timestamp: { type: Date, default: Date.now() },
})

const Purchase = mongoose.model("purchase", purchaseSchema)

module.exports = Purchase
