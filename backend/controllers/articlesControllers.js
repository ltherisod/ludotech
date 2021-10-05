const Article = require('../models/Article')

const articlesControllers = {
  
  addArticle: async (req,res) => {
    try {
      let article = new Article({ ...req.body })
      let newArticle = article.save()
      if (newArticle) {
        res.json({ success: true })
      } else {
        throw new Error()
      }
    } catch (error) {
      res.json({ success: false, error: error.message })
      console.log(error)
    }
  },

  getArticle: async (req,res) => {
    try {
      let getArticle = await Article.find({ _id: req.params.id})
      if (getArticle) {
        res.json({ success: true, response: getArticle })
      } else {
        throw new Error()
      }
    } catch (error) {
      res.json({ success: false, error: error.message })
      console.log(error)
    }
  },

  // se requiere filtros como {filters} en el body; puede venir vacio
  getAllArticles: async (req,res) => {
    try {
      if (Object.keys(req.body.filters).length === 0) {
        let getArticles = await Article.find()
        if (getArticles) {
          res.json({ success: true, response: getArticles})
        } else {
          throw new Error()
        }
      } else {
        let getArticles = await Article.find({ ...req.body.filters, minPlayers: { $gte: req.body.filters.minPlayers || null }, maxPlayers: { $lte: req.body.filters.maxPlayers || null }, minAge: { $gte: req.body.filters.minAge || null }}) 
        if (getArticles) {
          res.json({ success: true, response: getArticles })
        } else {
          throw new Error()
        }
      }
    } catch (error) {
      res.json({ success: false, error: error.message })
      console.log(error)
    }
  },

  updateArticle: async (req,res) => {
    try {
      let updateArticle = await Article.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
      if (updateArticle) {
        res.json({ success: true, response: updateArticle })
      } else {
        throw new Error()
      }
    } catch (error) {
      res.json({ success: false, error: error.message })
      console.log(error)
    }
  },

  deleteArticle: async (req,res) => {
    try {
      let deleteArticle = await Article.findOneAndDelete({ _id: req.params.id })
      if (deleteArticle) {
        res.json({ success: true, response: deleteArticle })
      } else {
        throw new Error()
      }
    } catch (error) {
      res.json({ success: false, error: error.message })
      console.log(error)
    }
  },
}

module.exports = articlesControllers