const User = require("../models/User")

const usersControllers = {
  hello: async (req, res) => {
    res.json({ response: "Hola!" })
  },
}

module.exports = usersControllers
