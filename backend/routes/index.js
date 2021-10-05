const express = require("express")
const router = express.Router()
const passport = require("passport")
const validators = require("../controllers/validators")
const articleValidator = require("../controllers/articleValidator")
const usersControllers = require("../controllers/usersControllers")
const articlesControllers = require("../controllers/articlesControllers")

// users routers
router.route("/login")
.post(usersControllers.logIn)

router.route("/signup")
.post(validators.signUpValidator, usersControllers.signUp)

router.route("/user/:id")
.put(passport.authenticate("jwt", { session: false }), validators.updateAccountValidator, usersControllers.updateAccount)

router.route("/users")
.get(usersControllers.getAccounts)


// articles routers
router.route('/articles')
.get(articlesControllers.getAllArticles)

router.route('/article/:id')
.get(articlesControllers.getArticle)
.put(articleValidator.articleUpdateValidator, articlesControllers.updateArticle)
.delete(articlesControllers.deleteArticle)

router.route('/article')
.post(articleValidator.articleValidator, articlesControllers.addArticle)

module.exports = router
