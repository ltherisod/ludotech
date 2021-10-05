const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  hasDiscount: { type: Boolean, default: false },
  discountPrice: { type: Number, required: false },
  photos: [{ type: String }], // revisar. quizá cambiar a File
  genres: [{ type: String }],
  gameType: { type: String }, // de rol, de mesa, etc. Revisar otros tipos de artículos: mangas, dados, muñecos, etc.
  minPlayers: { type: Number },
  maxPlayers: { type: Number },
  minAge: { type: Number },
  stock: { type: Number, required: true },
  size: { type: String, required: false }, // revisar
  weight: { type: String, required: false },
})

const Article = mongoose.model("article", articleSchema)

module.exports = Article
