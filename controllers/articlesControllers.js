const Article = require("../models/Article")

const articlesControllers = {
   addArticle: async (req, res) => {
      try {
         let article = new Article({ ...req.body })
         let newArticle = await article.save()
         if (newArticle) {
            res.json({ success: true, response: newArticle, error: null })
         } else {
            throw new Error("Couldn´t save the new article")
         }
      } catch (e) {
         res.json({ success: false, response: null, error: e.message })
      }
   },

   getArticle: async (req, res) => {
      try {
         let getArticle = await Article.findOne({ _id: req.params.id })
            .populate({ path: "brand", select: "name" })
            .populate({ path: "genres", select: "name" })
            .populate({ path: "gameType", select: "name" })
         if (getArticle) {
            await getArticle.updateOne(
               { $inc: { visitsCount: 1 } },
               { new: true }
            )
            res.json({ success: true, response: getArticle, error: null })
         } else {
            throw new Error("Couldn´t get the article")
         }
      } catch (e) {
         res.json({ success: false, response: null, error: e.message })
      }
   },

   getLastArticles: async (req, res) => {
      try {
         let articles = await Article.find()
            .sort("-_id")
            .limit(3)
            .select("name photos stock hasDiscount price discountPrice ")
         res.json({ success: true, response: articles, error: null })
      } catch (e) {
         console.log(e)
         res.json({ success: false, response: null, error: e.message })
      }
   },

   // se requiere filtros como {filters} en el body; puede venir vacio

   readAllArticles: async (req, res) => {
      try {
         const { page } = req.body
         const limitPerPage = 12
         if (Object.keys(req.body.filters).length === 0) {
            let getArticles = await Article.find()
               .populate({ path: "brand", select: "name" })
               .populate({ path: "genres", select: "name" })
               .populate({ path: "gameType", select: "name" })
               .skip((page - 1) * limitPerPage)
               .limit(limitPerPage)
            const totalCount = await Article.find().countDocuments()
            const totalPages = Math.ceil(totalCount / limitPerPage)
            if (getArticles) {
               res.json({
                  success: true,
                  response: {
                     articles: getArticles,
                     page,
                     totalCount,
                     totalPages,
                  },
                  // response: getArticles,
                  error: null,
               })
            } else {
               throw new Error("Couldn´t get all articles")
            }
         } else {
            let nameString = req.body.filters.name ? req.body.filters.name : ""
            const scapeString = (str) => {
               return String(str).replace(/([.*+?=^!:${}()|[\]\/\\])/g, "\\$1")
            }
            let getFilteredArticles = await Article.find({
               ...req.body.filters,
               name: { $regex: scapeString(nameString), $options: "i" },
               minPlayers: { $gte: req.body.filters.minPlayers || 0 },
               maxPlayers: {
                  $lte: req.body.filters.maxPlayers || Number.MAX_VALUE,
               },
               minAge: { $gte: req.body.filters.minAge || 0 },
               price: {
                  $gte: req.body.filters.minPrice || 0,
                  $lte: req.body.filters.maxPrice || Number.MAX_VALUE,
               },
               weight: { $gte: req.body.filters.weight || 0 },
            })
               .populate({ path: "brand", select: "name" })
               .populate({ path: "genres", select: "name" })
               .populate({ path: "gameType", select: "name" })
               .skip((page - 1) * limitPerPage)
               .limit(limitPerPage)
            const totalCount = await Article.find({
               ...req.body.filters,
               name: { $regex: scapeString(nameString), $options: "i" },
               minPlayers: { $gte: req.body.filters.minPlayers || 0 },
               maxPlayers: {
                  $lte: req.body.filters.maxPlayers || Number.MAX_VALUE,
               },
               minAge: { $gte: req.body.filters.minAge || 0 },
               price: {
                  $gte: req.body.filters.minPrice || 0,
                  $lte: req.body.filters.maxPrice || Number.MAX_VALUE,
               },
               weight: { $gte: req.body.filters.weight || 0 },
            }).countDocuments()
            const totalPages = Math.ceil(totalCount / limitPerPage)
            if (getFilteredArticles) {
               res.json({
                  success: true,
                  response: {
                     articles: getFilteredArticles,
                     page,
                     totalCount,
                     totalPages,
                  },
                  error: null,
               })
            } else {
               throw new Error("Couldn´t get the filtered articles")
            }
         }
      } catch (e) {
         res.json({ success: false, response: null, error: e.message })
      }
   },

   updateArticle: async (req, res) => {
      try {
         let updateArticle = await Article.findOneAndUpdate(
            { _id: req.params.id },
            { ...req.body },
            { new: true }
         )
            .populate({ path: "brand", select: "name" })
            .populate({ path: "genres", select: "name" })
            .populate({ path: "gameType", select: "name" })
         if (updateArticle) {
            res.json({ success: true, response: updateArticle, error: null })
         } else {
            throw new Error("Couldn´t update the article")
         }
      } catch (e) {
         res.json({ success: false, response: null, error: e.message })
      }
   },

   deleteArticle: async (req, res) => {
      try {
         let deleteArticle = await Article.findOneAndDelete({
            _id: req.params.id,
         })
         if (deleteArticle) {
            res.json({ success: true, response: deleteArticle, error: null })
         } else {
            throw new Error("Couldn´t delete the article")
         }
      } catch (e) {
         res.json({ success: false, response: null, error: e.message })
      }
   },

   getMostVisitArticles: async (req, res) => {
      try {
         let getMostVisitArticles = await Article.find()
            .sort("-visitsCount")
            .limit(3)
            .populate({ path: "brand", select: "name" })
            .populate({ path: "genres", select: "name" })
            .populate({ path: "gameType", select: "name" })
         if (getMostVisitArticles) {
            res.json({
               success: true,
               response: getMostVisitArticles,
               error: null,
            })
         } else {
            throw new Error("Couldn´t get most visit articles")
         }
      } catch (e) {
         res.json({ success: false, response: null, error: e.message })
      }
   },
   getRelated: async (req, res) => {
      try {
         const { genreId } = req.params
         const relatedArticles = await Article.find({ genres: genreId })
            .sort("-visitsCount")
            .limit(4)
            .populate("genres gameType brand")
         res.json({ success: true, response: relatedArticles, error: null })
      } catch (e) {
         res.json({ success: false, response: null, error: e.message })
      }
   },
}

module.exports = articlesControllers
