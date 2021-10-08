const express = require("express")
const router = express.Router()
const passport = require("passport")
const usersValidators = require("../controllers/usersValidators")
const articleValidator = require("../controllers/articleValidator")
const purchaseValidator = require("../controllers/purchaseValidator")
const isAdmin = require("../controllers/isAdmin")
const usersControllers = require("../controllers/usersControllers")
const articlesControllers = require("../controllers/articlesControllers")
const articlesUtilitiesControllers = require("../controllers/articlesUtilitiesControllers")
const purchaseControllers = require("../controllers/purchaseControllers")

// USERS ROUTES
router.route("/login").post(usersControllers.logIn)

router.route("/signup").post(usersControllers.signUp)

router
  .route("/user/verifyToken")
  .get(
    passport.authenticate("jwt", { session: false }),
    usersControllers.verifyToken
  )

router
  .route("/user/wish-list/:articleId")
  .put(
    passport.authenticate("jwt", { session: false }),
    usersControllers.toggleWishList
  )

router
  .route("/user/shopping-cart/reset")
  .get(
    passport.authenticate("jwt", { session: false }),
    usersControllers.resetShoppingCart
  )

router
  .route("/user/shopping-cart/:articleId")
  .post(
    passport.authenticate("jwt", { session: false }),
    usersControllers.shoppingCartHandler
  )

router
  .route("/user/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    usersValidators.updateAccountValidator,
    usersControllers.updateAccount
  )

router
  .route("/users")
  .get(
    passport.authenticate("jwt", { session: false }),
    usersControllers.getAccounts
  )

router.route("/purchases").get(purchaseControllers.getPurchases)

router
  .route("/user/purchase")
  .post(
    passport.authenticate("jwt", { session: false }),
    purchaseValidator,
    purchaseControllers.handlePurchase
  )

router.route("/user/purchase/:id").delete(purchaseControllers.deletePurchase) // only dev stage!

// USER DIRECTIONS ROUTES
router
  .route("/user/directions")
  .post(
    usersValidators.addDirectionsValidator,
    passport.authenticate("jwt", { session: false }),
    usersControllers.addDirection
  )

router
  .route("/user/direction/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    usersControllers.updateDirection
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    usersControllers.deleteDirection
  )

// ARTICLES ROUTES
router.route("/articles").post(articlesControllers.readAllArticles)

router
  .route("/article/:id")
  .get(articlesControllers.getArticle)
  .put(articlesControllers.updateArticle)
  .delete(articlesControllers.deleteArticle)

router.route("/mostvisitarticles").get(articlesControllers.getMostVisitArticles)

router.route("/article").post(articlesControllers.addArticle)

// ARTICLESUTILS ROUTES
router
  .route("/utils")
  .get(articlesUtilitiesControllers.getArticlesUtilities)
  .post(
    // passport.authenticate("jwt", { session: false }),
    // isAdmin,
    articlesUtilitiesControllers.addArticlesUtility
  )

router
  .route("/util/:id")
  .put(
    // passport.authenticate("jwt", { session: false }),
    // isAdmin,
    articlesUtilitiesControllers.updateArticlesUtility
  )
  .delete(
    // passport.authenticate("jwt", { session: false }),
    // isAdmin,
    articlesUtilitiesControllers.deleteArticlesUtility
  )
router
  .route("/article/:id")
  .get(articlesControllers.getArticle)
  .put(
    articleValidator.articleUpdateValidator,
    articlesControllers.updateArticle
  )
  .delete(articlesControllers.deleteArticle)

router
  .route("/article")
  .post(articleValidator.articleValidator, articlesControllers.addArticle)

// SEND EMAIL
router.route("/confirmation-email")
.post(usersControllers.sendConfirmationEmail)

router.route("/welcome-email").get(usersControllers.sendWelcomeEmail)

//admin routes
router
  .route("/admin")
  .get(usersControllers.getAdmins)
  .post(usersControllers.getUserByEmail)
router
  .route("/admin/set-admin")
  .post(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    usersControllers.setAdmin
  )

router
  .route("/admin/paypal-credentials")
  .get(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    usersControllers.getPaypalCredentials
  )

module.exports = router
