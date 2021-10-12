const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: mongoose.Types.ObjectId, ref: "articles_utilitie", required: true },
  price: { type: Number, required: true },
  hasDiscount: { type: Boolean, default: false },
  discountPrice: { type: Number, required: false },
  photos: [{ type: String }], // revisar. quizá cambiar a File
  genres: [{ type: mongoose.Types.ObjectId, ref: "articles_utilitie" }],
  gameType: { type: mongoose.Types.ObjectId, ref: "articles_utilitie" }, // de rol, de mesa, etc. Revisar otros tipos de artículos: mangas, dados, muñecos, etc.
  minPlayers: { type: Number },
  maxPlayers: { type: Number },
  minAge: { type: Number },
  playingTime: { type: Number }, //revisar si es string o number
  stock: { type: Number, required: true },
  size: { type: String, required: false }, // revisar
  iconPhotos: { type: String },
  decoPhotos: [{ type: String }],
  video: { type: String },
  description: { type: String },
  weight: { type: Number, required: false },
  visitsCount: { type: Number, default: 0 },
  videoId: { type: String },
})

const Article = mongoose.model("article", articleSchema)

module.exports = Article
