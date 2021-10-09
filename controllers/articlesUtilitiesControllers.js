const ArticlesUtility = require("../models/ArticlesUtility")

const articlesUtilitiesControllers = {
  getArticlesUtilities: async (req, res) => {
    try {
      const utilities = await ArticlesUtility.find().sort("name")
      const brands = []
      const genres = []
      const gameTypes = []
      utilities.forEach((utility) => {
        switch (utility.type) {
          case "brand":
            if (!brands.some((brand) => brand.name === utility.name)) {
              brands.push(utility)
            }
            break
          case "genre":
            if (!genres.some((genre) => genre.name === utility.name)) {
              genres.push(utility)
            }
            break
          case "gameType":
            if (!gameTypes.some((gameType) => gameType.name === utility.name)) {
              gameTypes.push(utility)
            }
            break
          default:
            throw new Error("Type not found.")
        }
      })
      res.json({
        success: true,
        response: { brands, genres, gameTypes },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  addArticlesUtility: async (req, res) => {
    try {
      const { name, type } = req.body
      const articlesUtility = new ArticlesUtility({ name, type })
      await articlesUtility.save()
      res.json({ success: true, response: articlesUtility, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateArticlesUtility: async (req, res) => {
    try {
      const { name, type } = req.body
      const articlesUtility = await ArticlesUtility.findOneAndUpdate(
        { _id: req.params.id },
        { name, type },
        { new: true }
      )
      res.json({ success: true, response: articlesUtility, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  deleteArticlesUtility: async (req, res) => {
    try {
      const articlesUtility = await ArticlesUtility.findOneAndDelete({
        _id: req.params.id,
      })
      res.json({ success: true, response: articlesUtility, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = articlesUtilitiesControllers
