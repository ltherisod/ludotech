const express = require("express")
const router = express.Router()
const usersControllers = require("../controllers/usersControllers")
const articlesControllers = require("../controllers/articlesControllers")

router.route("/hello").get(usersControllers.hello)

// articles routers
router.route('/articles')
.get(articlesControllers.getAllArticles)

router.route('/article/:id')
.get(articlesControllers.getArticle)
.put(articlesControllers.updateArticle)
.delete(articlesControllers.deleteArticle)

router.route('/article')
.post(articlesControllers.addArticle)

module.exports = router
