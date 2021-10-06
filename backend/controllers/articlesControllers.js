const Article = require('../models/Article')

const articlesControllers = {
  
  addArticle: async (req,res) => {
    try {
      let article = new Article({ ...req.body })
      let newArticle = article.save()
      if (newArticle) {
        res.json({ success: true, response: newArticle, error: null})
      } else {
        throw new Error('Couldn´t save the new article')
      }
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },

  getArticle: async (req,res) => {
    try {
      let getArticle = await Article.find({ _id: req.params.id})
      if (getArticle) {
        res.json({ success: true, response: getArticle, error: null })
      } else {
        throw new Error('Couldn´t get the article')
      }
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })    
    }
  },

  // se requiere filtros como {filters} en el body; puede venir vacio
  getAllArticles: async (req,res) => {
    try {
      if (Object.keys(req.body.filters).length === 0) {
        let getArticles = await Article.find().populate({ path: 'brand', select: 'name' }).populate({ path: 'genres', select: 'name' }).populate({ path: 'gameType', select: 'name' })

        if (getArticles) {
          res.json({ success: true, response: getArticles, error: null })
        } else {
          throw new Error('Couldn´t get all articles')
        }
      } else {
        let getFilteredArticles = await Article.find({ ...req.body.filters,  minPlayers: { $gte: req.body.filters.minPlayers || 0 }, maxPlayers: { $lte: req.body.filters.maxPlayers || Number.MAX_VALUE }, minAge: { $gte: req.body.filters.minAge || 0 }, price: { $gte: req.body.filters.minPrice || 0, $lte: req.body.filters.maxPrice || Number.MAX_VALUE }})
        if (getFilteredArticles) {
          res.json({ success: true, response: getFilteredArticles, error: null })
        } else {
          throw new Error('Couldn´t get the filtered articles')
        }
      }
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },

  updateArticle: async (req,res) => {
    try {
      let updateArticle = await Article.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
      if (updateArticle) {
        res.json({ success: true, response: updateArticle, error: null })
      } else {
        throw new Error('Couldn´t update the article')
      }
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },

  deleteArticle: async (req,res) => {
    try {
      let deleteArticle = await Article.findOneAndDelete({ _id: req.params.id })
      if (deleteArticle) {
        res.json({ success: true, response: deleteArticle, error: null })
      } else {
        throw new Error('Couldn´t delete the article')
      }
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })    
    }
  },
}

module.exports = articlesControllers


// minPlayers: { $gte: req.body.filters.minPlayers || 0 }, maxPlayers: { $lte: req.body.filters.maxPlayers || 0 }, minAge: { $gte: req.body.filters.minAge || 0 }