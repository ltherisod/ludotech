const mongoose = require("mongoose")

const articlesUtilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
})

const ArticlesUtility = mongoose.model(
  "articles_utilitie",
  articlesUtilitySchema
)

module.exports = ArticlesUtility
