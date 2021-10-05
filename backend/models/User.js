const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String, required: true }, // cambiar por tipo de dato File.
  phone: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  google: { type: Boolean, default: false },
  directions: [
    {
      street: { type: String, required: true },
      number: { type: Number, required: true },
      department: { type: String, required: true },
      zipCode: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
  ],
  wishList: [{ type: mongoose.Types.ObjectId, ref: "article" }],
  purchaseHistory: [{ type: mongoose.Types.ObjectId, ref: "article" }],
  createdAt: { type: Date, default: Date.now() },
  passwordChangesHistory: [
    { oldPassword: { type: String }, date: { type: Date } },
  ],
})

const User = mongoose.model("user", userSchema)

module.exports = User
