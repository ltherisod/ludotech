const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const usersControllers = {
  logIn: async (req, res) => {
    try {
      const { email, password, google } = req.body
      const user = await User.findOne({ email })
      console.log(user)
      if (!user) throw new Error("Invalid credentials")
      if (user.google && !google)
        throw new Error(
          "You have a google account registered, please log in with them."
        )
      if (!user.google && google) {
        throw new Error("This account was not registered with google.")
      }
      const isValidPassword = await bcryptjs.compare(password, user.password)
      if (!isValidPassword) throw new Error("Invalid credentials")
      const { _id, firstname, lastname, photo, isAdmin, directions } = user
      const token = jwt.sign({ _id, email }, process.env.SECRETKEY)
      res.json({
        success: true,
        response: {
          _id,
          email,
          firstname,
          lastname,
          photo,
          isAdmin,
          directions,
          token,
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  signUp: async (req, res) => {
    try {
      const { firstname, lastname, email, password, photo, google } = req.body
      const emailInUse = await User.findOne({ email })
      if (emailInUse) throw new Error("Email in use.")
      const hashedPass = await bcryptjs.hash(password, 10)
      const user = new User({
        firstname,
        lastname,
        email,
        password: hashedPass,
        photo,
        google,
      })
      await user.save()
      const token = await jwt.sign(
        { _id: user._id, email },
        process.env.SECRETKEY
      )
      res.json({
        success: true,
        response: {
          _id: user._id,
          firstname,
          lastname,
          email,
          photo,
          isAdmin: user.isAdmin,
          directions: user.directions,
          token,
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateAccount: async (req, res) => {
    try {
      const { firstname, lastname, email, password, photo, phone } = req.body
      const newEmailInUse = await User.findOne({ email })
      if (
        newEmailInUse &&
        newEmailInUse._id.toString() !== req.user._id.toString()
      )
        throw new Error("Email already in use.")
      let hashedNewPassword
      if (password) {
        hashedNewPassword = await bcryptjs.hash(password, 10)
      }
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          firstname,
          lastname,
          email,
          password: hashedNewPassword || req.user.password,
          photo,
          phone,
        },
        { new: true }
      )
      res.json({
        success: true,
        response: user,
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  directionsManager: async (req, res) => {
    try {
      const {
        alias,
        receiver,
        street,
        number,
        department,
        zipCode,
        city,
        state,
        action,
      } = req.body
      switch (action) {
        case "add":
          if (
            req.user.directions.find(
              (d) =>
                d.street === street &&
                d.number === number &&
                d.department === department &&
                d.zipCode === zipCode &&
                d.city === city &&
                d.state === state
            )
          ) {
            throw new Error("Direction already saved.")
          }
          const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
              $push: {
                directions: {
                  alias,
                  receiver,
                  street,
                  number,
                  department,
                  zipCode,
                  city,
                  state,
                },
              },
            },
            { new: true }
          )
      }
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getAccounts: async (req, res) => {
    // dev stage only!
    try {
      const users = await User.find()
      res.json({ success: true, response: users, error: null })
    } catch (e) {
      console.log("Estoy acá en el controlador...")
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = usersControllers
