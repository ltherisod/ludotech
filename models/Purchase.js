const mongoose = require("mongoose")

const purchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user" },
  articles: [
    {
      _id: { type: mongoose.Types.ObjectId, ref: "article" },
      name: { type: String, required: true },
      brand: {
        name: String,
        type: String,
      },
      price: { type: Number, required: true },
      hasDiscount: { type: Boolean, default: false },
      discountPrice: { type: Number, required: false },
      photos: [{ type: String }],
      genres: [{ name: String, type: String }],
      gameType: { name: String, type: String },
      minPlayers: { type: Number },
      maxPlayers: { type: Number },
      minAge: { type: Number },
      stock: { type: Number, required: true },
      size: { type: String, required: false },
      weight: { type: Number, required: false },
      quantity: Number,
    },
  ],
  direction: {
    receiver: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: Number, required: true },
    department: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  total: { type: Number, required: true },
  paymentDetails: {
    method: { type: String, required: true },
    orderId: { type: String, required: true },
    receipt: String,
  },
  status: { type: String, default: "processing" },
  logs: [{ type: String }],
  timestamp: { type: Date, default: Date.now() },
})

const Purchase = mongoose.model("purchase", purchaseSchema)

module.exports = Purchase
