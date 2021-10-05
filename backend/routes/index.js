const express = require("express")
const router = express.Router()
const passport = require("passport")
const validators = require("../controllers/validators")
const usersControllers = require("../controllers/usersControllers")

router.route("/login").post(usersControllers.logIn)
router
  .route("/signup")
  .post(validators.signUpValidator, usersControllers.signUp)

router
  .route("/user/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    validators.updateAccountValidator,
    usersControllers.updateAccount
  )

router.route("/users").get(usersControllers.getAccounts)

module.exports = router
