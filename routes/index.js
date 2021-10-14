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
  .route("/users-count")
  .get(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    usersControllers.getUsersCount
  )

router
  .route("/last-registered")
  .get(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    usersControllers.getLastUsers
  )

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
    isAdmin,
    usersControllers.getAccounts
  )

// router
//   .route("/stripe/get-payment-method/:id")
//   .get(purchaseControllers.stripeTest)

router
  .route("/stripe/payment-intent")
  .post(
    passport.authenticate("jwt", { session: false }),
    purchaseControllers.stripePaymentIntent
  )

router.route("/receipt/:id").get(purchaseControllers.createPurchasePDF)

router
  .route("/user/purchase")
  .post(
    passport.authenticate("jwt", { session: false }),
    purchaseValidator,
    purchaseControllers.handlePurchase
  )

router
  .route("/purchases")
  .get(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    purchaseControllers.getPurchases
  )

router
  .route("/user/purchase/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    purchaseControllers.getPurchaseById
  )
  .put(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    purchaseControllers.updateStatus
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    purchaseControllers.deletePurchase
  ) // only dev stage!

router
  .route("/user/purchases/:userId")
  .get(
    passport.authenticate("jwt", { session: false }),
    purchaseControllers.getPurchasesByUserId
  )

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

router.route("/last-articles").get(articlesControllers.getLastArticles)

router
  .route("/article/:id")
  .get(articlesControllers.getArticle)
  .put(
    articleValidator.articleUpdateValidator,
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    articlesControllers.updateArticle
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    articlesControllers.deleteArticle
  )

router.route("/mostvisitarticles").get(articlesControllers.getMostVisitArticles)

router
  .route("/article")
  .post(
    articleValidator.articleValidator,
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    articlesControllers.addArticle
  )

// ARTICLESUTILS ROUTES
router
  .route("/utils")
  .get(articlesUtilitiesControllers.getArticlesUtilities)
  .post(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    articlesUtilitiesControllers.addArticlesUtility
  )

router
  .route("/util/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    articlesUtilitiesControllers.updateArticlesUtility
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    articlesUtilitiesControllers.deleteArticlesUtility
  )

router.route("/article/related/:genreId").get(articlesControllers.getRelated)

// SEND EMAIL
// router.route("/confirmation-email").post(usersControllers.sendConfirmationEmail)

// router
//   .route("/resend-confirmation-email")
//   .post(usersControllers.sendReSendConfirmationEmail)

router
  .route("/welcome-email")
  .post(
    passport.authenticate("jwt", { session: false }),
    usersControllers.sendWelcomeEmail
  )

// router
//   .route("/reset-password-confirmation")
//   .post(
//     passport.authenticate("jwt", { session: false }),
//     usersControllers.sendResetPaswordConfirmation
//   )

// router
//   .route("/new-password")
//   .post(
//     passport.authenticate("jwt", { session: false }),
//     usersControllers.sendNewPassword
//   )

// router
//   .route("/fail-purchase")
//   .post(
//     passport.authenticate("jwt", { session: false }),
//     usersControllers.sendFailPurchase
//   )

router
  .route("/success-purchase")
  .post(
    passport.authenticate("jwt", { session: false }),
    usersControllers.sendSuccessPurchase
  )

// router
//   .route("/user-bill-checkout")
//   .post(
//     passport.authenticate("jwt", { session: false }),
//     usersControllers.sendUserBillCheckout
//   )

// router
//   .route("/delete-account-confirmation")
//   .post(
//     passport.authenticate("jwt", { session: false }),
//     usersControllers.sendDeleteAccountConfirmation
//   )

// router
//   .route("/delete-account")
//   .post(
//     passport.authenticate("jwt", { session: false }),
//     usersControllers.sendDeleteAccount
//   )

//admin routes
router
  .route("/admin")
  .get(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    usersControllers.getAdmins
  )
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
