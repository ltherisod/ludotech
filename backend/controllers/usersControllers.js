const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const { findOneAndUpdate } = require("../models/User")

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.USEREMAIL,
    pass: process.env.USERPASSWORD,
    clientId: process.env.CLIENID,
    clientSecret: process.env.CLIENTSECRET,
    refreshToken: process.env.REFRESHTOKEN,
  },
})

const usersControllers = {
  sendWelcomeEmail: (req, res) => {
    let message = `<div><h3>WELCOME</h3></div>`
    let mailOptions = {
      from: "Ludotehc <ludotechweb@gmail.com>",
      to: "<jc.venepro@gmail.com>",
      subject: "Welcome",
      text: message,
      html: message,
    }
    transporter.sendMail(mailOptions, (e, data) => {
      if (!e) {
        res.json({ success: true, response: data, error: null })
      } else {
        res.json({ success: false, response: null, error: e })
        console.log(e)
      }
    })
  },
  logIn: async (req, res) => {
    try {
      const { email, password, google } = req.body
      const user = await User.findOne({ email }).populate(
        "wishList shoppingCart.article"
      )
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
      const {
        _id,
        firstname,
        lastname,
        photo,
        phone,
        isAdmin,
        directions,
        wishList,
        shoppingCart,
      } = user
      const token = jwt.sign({ _id, email }, process.env.SECRETKEY)
      res.json({
        success: true,
        response: {
          _id,
          email,
          firstname,
          lastname,
          photo,
          phone,
          isAdmin,
          directions,
          token,
          wishList,
          shoppingCart,
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  signUp: async (req, res) => {
    try {
      const { firstname, lastname, email, password, photo, google, phone } =
        req.body
      const emailInUse = await User.findOne({ email })
      if (emailInUse) throw new Error("Email in use.")
      const hashedPass = await bcryptjs.hash(password, 10)
      const user = new User({
        firstname,
        lastname,
        email,
        password: hashedPass,
        photo,
        phone,
        google,
      })
      await user.save()
      const token = jwt.sign({ _id: user._id, email }, process.env.SECRETKEY)
      res.json({
        success: true,
        response: {
          _id: user._id,
          firstname,
          lastname,
          email,
          photo,
          phone: user.phone,
          isAdmin: user.isAdmin,
          directions: user.directions,
          wishList: user.wishList,
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
      ).populate("wishList")
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.SECRETKEY
      )
      res.json({
        success: true,
        response: {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          photo: user.photo,
          phone: user.phone,
          isAdmin: user.isAdmin,
          directions: user.directions,
          wishList: user.wishList,
          token,
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  addDirection: async (req, res) => {
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
      } = req.body
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
      res.json({ success: true, response: user.directions, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateDirection: async (req, res) => {
    // mandar token y validar con passport. mandar el id de la dirección por params
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
      } = req.body
      const currentDirection = req.user.directions.find(
        (d) => d._id.toString() === req.params.id
      )
      const user = await User.findOneAndUpdate(
        { "directions._id": req.params.id },
        {
          $set: {
            "directions.$": {
              alias: alias || currentDirection.alias,
              receiver: receiver || currentDirection.receiver,
              street: street || currentDirection.receiver,
              number: number || currentDirection.number,
              department: department || currentDirection.department,
              zipCode: zipCode || currentDirection.zipCode,
              city: city || currentDirection.city,
              state: state || currentDirection.state,
            },
          },
        },
        { new: true }
      )
      res.json({ success: true, response: user.directions, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  deleteDirection: async (req, res) => {
    // mandar id de la dirección por params.
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { directions: { _id: req.params.id } } },
        { new: true }
      )
      res.json({ success: true, response: user.directions, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  verifyToken: async (req, res) => {
    const {
      _id,
      email,
      firstname,
      lastname,
      photo,
      phone,
      isAdmin,
      directions,
      wishList,
    } = req.user
    res.json({
      success: true,
      response: {
        _id,
        email,
        firstname,
        lastname,
        photo,
        phone,
        isAdmin,
        wishList,
        directions,
      },
      error: null,
    })
  },
  toggleWishList: async (req, res) => {
    try {
      // /user/wish-list/:articleId es la ruta, y mandar el token en headers.
      const { articleId } = req.params
      let user = await User.findOne({ _id: req.user._id })
      if (user.wishList.some((a) => a._id.toString() === articleId)) {
        user = await User.findOneAndUpdate(
          { _id: req.user._id },
          { $pull: { wishList: articleId } },
          { new: true }
        ).populate("wishList")
      } else {
        user = await User.findOneAndUpdate(
          { _id: req.user._id },
          { $addToSet: { wishList: articleId } },
          { new: true }
        ).populate("wishList")
      }
      res.json({ success: true, response: user.wishList, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  addToShoppingCart: async (req, res) => {
    try {
      // viene un id del documento de shoppingCart por params (shoppingCart: [{_id (este _id), article, quantity},...{...}]), el token por headers, y por body la cantidad de artículos que voy a setear.
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { "shoppingCart.$.quantity": req.body.quantity } },
        { new: true }
      )
      res.json({ success: true, response: user.shoppingCart, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  setShoppingCart: async (req, res) => {
    try {
      // viene un id del documento de shoppingCart por params (shoppingCart: [{_id (este _id), article, quantity},...{...}]), el token por headers, y por body la cantidad de artículos que voy a setear.
      const user = await User.findOneAndUpdate(
        { _id: req.user._id, "shoppingCart._id": req.params.id },
        { $set: { "shoppingCart.$.quantity": req.body.quantity } },
        { new: true }
      )
      res.json({ success: true, response: user.shoppingCart, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  shoppingCartHandler: async (req, res) => {
    try {
      // llega articleId por params, token por headers, y action por body
      const { action } = req.body
      const { shoppingCart } = req.user
      const { articleId } = req.params
      if (!action) throw new Error("You must specify an action")
      let user
      if (
        shoppingCart.some((item) => item.article._id.toString() === articleId)
      ) {
        const item = shoppingCart.find(
          (item) => item.article._id.toString() === articleId
        )
        if (action === "increment") {
          if (item.quantity === item.article.stock)
            throw new Error("Cannot add more of this item.")
          user = await User.findOneAndUpdate(
            { "shoppingCart.article": articleId },
            { $inc: { "shoppingCart.$.quantity": 1 } },
            { new: true }
          )
        } else if (action === "decrement") {
          if (item.quantity > 1) {
            user = await User.findOneAndUpdate(
              { "shoppingCart.article": articleId },
              { $inc: { "shoppingCart.$.quantity": -1 } },
              { new: true }
            )
          } else {
            // quitarlo con el botón de decrement también! en caso de que haya 1 solo
            user = await User.findOneAndUpdate(
              { "shoppingCart.article": articleId },
              { $pull: { shoppingCart: { article: articleId } } },
              { new: true }
            )
          }
        } else if (action === "delete") {
          // quitarlo independiente de la cantidad que tenga.
          user = await User.findOneAndUpdate(
            { "shoppingCart.article": articleId },
            { $pull: { shoppingCart: { article: articleId } } },
            { new: true }
          )
        } else {
          throw new Error(
            "Action not found. Valid actions are: increment, decrement and delete."
          )
        }
      } else {
        if (action !== "add") {
          throw new Error("Invalid action.")
        }
        user = await User.findOneAndUpdate(
          { _id: req.user._id },
          { $push: { shoppingCart: { article: articleId, quantity: 1 } } },
          { new: true }
        )
      }
      res.json({ success: true, response: user.shoppingCart, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getAdmins: async (req, res) => {
    try {
      const admins = await User.find({ isAdmin: true }).select(
        "firstname lastname email photo"
      )
      res.json({ success: true, response: admins, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getUserByEmail: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email }).select(
        "firstname lastname email photo"
      )
      res.json({ success: true, response: user, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  setAdmin: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { email: req.body.email },
        { isAdmin: true },
        { new: true }
      ).select("firstname lastname email photo isAdmin")
      res.json({ success: true, response: user, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getAccounts: async (req, res) => {
    // dev stage only!
    console.log(req.user.shoppingCart)
    try {
      const users = await User.find().populate("wishList")
      res.json({ success: true, response: users, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = usersControllers
