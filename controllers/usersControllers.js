const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const path = require("path")
const transporter = require("../config/transporterEmail")
const indexEmail = require("../config/emailsBody/indexEmail")

const usersControllers = {
  getUsersCount: async (req, res) => {
    try {
      let usersCount = await User.find().countDocuments()
      res.json({ success: true, response: usersCount, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getLastUsers: async (req, res) => {
    try {
      let users = await User.find()
        .sort("-_id")
        .limit(3)
        .select("firstname lastname email photo")
      res.json({ success: true, response: users, error: null })
    } catch (e) {
      console.log(e)
      res.json({ success: false, response: null, error: e.message })
    }
  },
  logIn: async (req, res) => {
    try {
      const { email, password, google } = req.body
      const user = await User.findOne({ email })
        .populate("shoppingCart.article")
        .populate({ path: "wishList", populate: "brand genres gameType" })
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
          google: user.google,
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  signUp: async (req, res) => {
    try {
      const { firstname, lastname, email, password, google, phone } = req.body
      const emailInUse = await User.findOne({ email })
      if (emailInUse) throw new Error("Email in use.")
      const hashedPass = await bcryptjs.hash(password, 10)
      const user = new User({
        firstname,
        lastname,
        email,
        password: hashedPass,
        phone,
        google,
      })
      if (!google && req.files?.photo) {
        const { photo } = req.files
        const photoPath = `${user._id}_${Date.now()}.${
          photo.name.split(".")[photo.name.split(".").length - 1]
        }`
        user.photo = photoPath
        photo.mv(path.join(__dirname, "..", "assets", photoPath))
      } else {
        user.photo = req.body.photo
      }
      await user.save()
      const token = jwt.sign({ _id: user._id, email }, process.env.SECRETKEY)
      res.json({
        success: true,
        response: {
          _id: user._id,
          firstname,
          lastname,
          email,
          photo: user.photo,
          phone: user.phone,
          isAdmin: user.isAdmin,
          directions: user.directions,
          wishList: user.wishList,
          shoppingCart: user.shoppingCart,
          google: user.google,
          token,
        },
        error: null,
      })
    } catch (e) {
      console.log(e)
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateAccount: async (req, res) => {
    try {
      const { firstname, lastname, email, password, phone } = req.body
      const photo = req.files?.photo
      const newEmailInUse = await User.findOne({ email })
      if (!req.user._id.toString() === req.params.id.toString())
        throw new Error("Unauthorized.")
      if (
        newEmailInUse &&
        newEmailInUse._id.toString() !== req.user._id.toString()
      )
        throw new Error("Email already in use.")
      let hashedNewPassword
      if (password) {
        hashedNewPassword = await bcryptjs.hash(password, 10)
      }
      let photoPath
      if (photo) {
        photoPath = `${user._id}_${Date.now()}.${
          photo.name.split(".")[photo.name.length - 1]
        }`
        photo.mv(`${__dirname}/assets/${photoPath}`)
      }
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          firstname,
          lastname,
          email,
          password: hashedNewPassword || req.user.password,
          photo: photoPath ?? req.user.photo,
          phone,
        },
        { new: true }
      )
        .populate("shoppingCart.article")
        .populate({ path: "wishList", populate: "brand genres gameType" })
      // .select('_id firstname lastname email photo phone isAdmin directions directions wishList shoppingCart')
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
          shoppingCart: user.shoppingCart,
          google: user.google,
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
    const user = await User.findOne({ _id: req.user._id })
      .populate("shoppingCart.article")
      .populate({ path: "wishList", populate: "brand genres gameType" })
      .select(
        "_id email firstname lastname photo phone isAdmin directions wishList shoppingCart google"
      )
    res.json({
      success: true,
      response: user,
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
        ).populate({ path: "wishList", populate: "brand genres gameType" })
      } else {
        user = await User.findOneAndUpdate(
          { _id: req.user._id },
          { $addToSet: { wishList: articleId } },
          { new: true }
        ).populate({ path: "wishList", populate: "brand genres gameType" })
      }
      res.json({ success: true, response: user.wishList, error: null })
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
        if (action === "increment" || action === "add") {
          if (item.quantity === item.article.stock)
            throw new Error("Cannot add more of this item.")
          user = await User.findOneAndUpdate(
            { _id: req.user._id, "shoppingCart.article": articleId },
            { $inc: { "shoppingCart.$.quantity": 1 } },
            { new: true }
          ).populate({
            path: "shoppingCart.article",
            populate: {
              path: "brand genres gameType",
              select: "_id name",
            },
          })
        } else if (action === "decrement") {
          if (item.quantity > 1) {
            user = await User.findOneAndUpdate(
              { _id: req.user._id, "shoppingCart.article": articleId },
              { $inc: { "shoppingCart.$.quantity": -1 } },
              { new: true }
            ).populate({
              path: "shoppingCart.article",
              populate: {
                path: "brand genres gameType",
                select: "_id name",
              },
            })
          } else {
            // quitarlo con el botón de decrement también! en caso de que haya 1 solo
            user = await User.findOneAndUpdate(
              { _id: req.user._id, "shoppingCart.article": articleId },
              { $pull: { shoppingCart: { article: articleId } } },
              { new: true }
            ).populate({
              path: "shoppingCart.article",
              populate: {
                path: "brand genres gameType",
                select: "_id name",
              },
            })
          }
        } else if (action === "delete") {
          // quitarlo independiente de la cantidad que tenga.
          user = await User.findOneAndUpdate(
            { _id: req.user._id, "shoppingCart.article": articleId },
            { $pull: { shoppingCart: { article: articleId } } },
            { new: true }
          ).populate({
            path: "shoppingCart.article",
            populate: {
              path: "brand genres gameType",
              select: "_id name",
            },
          })
        } else {
          throw new Error(
            "Action not found. Valid actions are: increment, decrement, add and delete."
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
        ).populate({
          path: "shoppingCart.article",
          populate: { path: "brand genres gameType", select: "_id name" },
        })
      }
      res.json({ success: true, response: user.shoppingCart, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  resetShoppingCart: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { shoppingCart: [] } },
        { new: true }
      )
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
        "firstname lastname email photo isAdmin"
      )
      res.json({ success: true, response: user, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  setAdmin: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email }).select(
        "firstname lastname email photo isAdmin"
      )
      user.isAdmin = !user.isAdmin
      await user.save()
      res.json({ success: true, response: user, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getPaypalCredentials: (req, res) => {
    res.json({
      success: true,
      response: {
        username: process.env.PAYPAL_CLIENTID,
        password: process.env.PAYPAL_SECRET,
      },
      error: null,
    })
  },
  getAccounts: async (req, res) => {
    // dev stage only!
    try {
      const users = await User.find().populate("wishList")
      res.json({ success: true, response: users, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  sendConfirmationEmail: async (req, res) => {
    let mailOptions = {
      from: "Ludotehc <ludotechweb@gmail.com>",
      to: `<${req.body.email}`,
      subject: `Confirmation for ${req.body.name}`,
      text: indexEmail.Welcome(req.body),
      html: indexEmail.Welcome(req.body),
    }
    transporter.sendMail(mailOptions, (e, data) => {
      if (!e) {
        res.json({ success: true, response: data, error: null })
      } else {
        res.json({ success: false, response: null, error: e.message })
        console.log(e)
      }
    })
  },
  sendReSendConfirmationEmail: (req, res) => {
    let mailOptions = {
      from: "Ludotehc <ludotechweb@gmail.com>",
      to: `<${req.body.email}`,
      subject: `Confirmation for ${req.body.name}`,
      text: indexEmail.ReSendConfirmationEmail(req.body),
      html: indexEmail.ReSendConfirmationEmail(req.body),
    }
    transporter.sendMail(mailOptions, (e, data) => {
      if (!e) {
        res.json({ success: true, response: data, error: null })
      } else {
        res.json({ success: false, response: null, error: e.message })
        console.log(e)
      }
    })
  },
  sendWelcomeEmail: (req, res) => {
    let mailOptions = {
      from: "Ludotehc <ludotechweb@gmail.com>",
      to: `<${req.body.email}`,
      subject: `Welcome ${req.body.firstname} ${req.body.lastname}`,
      text: indexEmail.Welcome(req.body),
      html: indexEmail.Welcome(req.body),
    }
    transporter.sendMail(mailOptions, (e, data) => {
      if (!e) {
        console.lgo('entro al if de success email welcome')
        res.json({ success: true, response: data, error: null })
      } else {
        console.log('entro al else', e.message)
        res.json({ success: false, response: null, error: e.message })
        console.log(e)
      }
    })
  },
  sendResetPaswordConfirmation: (req, res) => {
    let mailOptions = {
      from: "Ludotehc <ludotechweb@gmail.com>",
      to: `<${req.body.email}`,
      subject: `Confirm reset password`,
      text: indexEmail.ResetPasswordConfirmation(req.body),
      html: indexEmail.ResetPasswordConfirmation(req.body),
    }
    transporter.sendMail(mailOptions, (e, data) => {
      if (!e) {
        res.json({ success: true, response: data, error: null })
      } else {
        res.json({ success: false, response: null, error: e.message })
        console.log(e)
      }
    })
  },
  sendNewPassword: (req, res) => {
    let mailOptions = {
      from: "Ludotehc <ludotechweb@gmail.com>",
      to: `<${req.body.email}`,
      subject: `Your password has been reset`,
      text: indexEmail.NewPassword(req.body),
      html: indexEmail.NewPassword(req.body),
    }
    transporter.sendMail(mailOptions, (e, data) => {
      if (!e) {
        res.json({ success: true, response: data, error: null })
      } else {
        res.json({ success: false, response: null, error: e.message })
        console.log(e)
      }
    })
  },
  sendSuccessPurchase: (req, res) => {
    let mailOptions = {
      from: "Ludotehc <ludotechweb@gmail.com>",
      to: `<${req.body.user.email}`,
      subject: `Success purchase by ${
        req.body.user.firstname + " " + req.body.user.lastname
      }`,
      text: indexEmail.SuccessPurchase(req.body),
      html: indexEmail.SuccessPurchase(req.body),
    }
    transporter.sendMail(mailOptions, (e, data) => {
      if (!e) {
        res.json({ success: true, response: data, error: null })
      } else {
        res.json({ success: false, response: null, error: e.message })
        console.log(e)
      }
    })
  },
  sendFailPurchase: (req, res) => {
    // let mailOptions = {
    //   from: "Ludotehc <ludotechweb@gmail.com>",
    //   to: `<${req.body.email}`,
    //   subject: `Fail purchase by ${req.body.name}`,
    //   text: indexEmail.FailPurchase(req.body),
    //   html: indexEmail.FailPurchase(req.body),
    // }
    // transporter.sendMail(mailOptions, (e, data) => {
    //   if (!e) {
    //     res.json({ success: true, response: data, error: null })
    //   } else {
    //     res.json({ success: false, response: null, error: e.message })
    //     console.log(e)
    //   }
    // })
  },
  sendUserBillCheckout: (req, res) => {
    let mailOptions = {
      from: "Ludotehc <ludotechweb@gmail.com>",
      to: `<${req.body.email}`,
      subject: `Hello ${req.body.name}. Purchase bill`,
      text: indexEmail.UserBillCheckout(req.body),
      html: indexEmail.UserBillCheckout(req.body),
    }
    transporter.sendMail(mailOptions, (e, data) => {
      if (!e) {
        res.json({ success: true, response: data, error: null })
      } else {
        res.json({ success: false, response: null, error: e.message })
        console.log(e)
      }
    })
  },
  sendDeleteAccountConfirmation: (req, res) => {
    let mailOptions = {
      from: "Ludotehc <ludotechweb@gmail.com>",
      to: `<${req.body.email}`,
      subject: `Confirm delete user account`,
      text: indexEmail.DeleteAccountConfirmation(req.body),
      html: indexEmail.DeleteAccountConfirmation(req.body),
    }
    transporter.sendMail(mailOptions, (e, data) => {
      if (!e) {
        res.json({ success: true, response: data, error: null })
      } else {
        res.json({ success: false, response: null, error: e.message })
        console.log(e)
      }
    })
  },
  sendDeleteAccount: (req, res) => {
    let mailOptions = {
      from: "Ludotehc <ludotechweb@gmail.com>",
      to: `<${req.body.email}`,
      subject: `Your account has been deleted`,
      text: indexEmail.DeleteAccount(req.body),
      html: indexEmail.DeleteAccount(req.body),
    }
    transporter.sendMail(mailOptions, (e, data) => {
      if (!e) {
        res.json({ success: true, response: data, error: null })
      } else {
        res.json({ success: false, response: null, error: e.message })
        console.log(e)
      }
    })
  },
}

module.exports = usersControllers
