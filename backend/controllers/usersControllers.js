const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const path = require("path")

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
    let message = `
    <body style="margin: 0;padding: 0;box-sizing: border-box;font-family:Poppins,sans-serif;text-decoration: none;background-color:#8646d4">
      <header style="width: 100vw;">
        <div style="width:100vw;height:40vh;background-image:url(https://i.postimg.cc/L2XVbY6Q/hero-Pages.png);background-position:top;background-size:cover;background-repeat:no-repeat;display:flex;justify-content:center;align-items:flex-end; ">
          <h2 style="background-color:transparent;">LUDOTECH</h2>
        </div>
      </header>
      <main style="width:80vw;margin:0 auto;">
        <h3>Hello {name}</h3>
        <p style="font-size:1.2rem">Welcome to <span style="font-size:1.5rem">Ludotech</span> where you will find all the game you desire.</p>
        <p>Please click here to <span style="font-size:1.2rem;color:#542b86;text-decoration:underline;">Confirm your e-mail</span> for your account.</p>
        <br/>
        <p>We´re glad to have in our comunu¡ity to find and share opinions about the games.</p>
      </main>
      <footer style="">
        <span style="font-size:0.8">Ludotech</span>
      </footer>
    </body>`
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
        console.log(path.join(__dirname, "..", "assets"))
        photo.mv(path.join(__dirname, "..", "assets", photoPath))
      } else {
        user.photo = req.body.photo
      }
      await user.save()
      console.log(user)
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
      const { photo } = req.files
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
      ).populate("wishList shoppingCart.article")
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
      .populate("wishList shoppingCart.article")
      .select(
        "_id email firstname lastname photo phone isAdmin directions wishList shoppingCart"
      )
    console.log(user)
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
