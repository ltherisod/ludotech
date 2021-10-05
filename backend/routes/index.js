const express = require("express")
const router = express.Router()
const usersControllers = require("../controllers/usersControllers")

router.route("/hello").get(usersControllers.hello)

module.exports = router
