const Purchase = require("../models/Purchase")
const User = require("../models/User")
const Article = require("../models/Article")

const purchaseControllers = {
  handlePurchase: async (req, res) => {
    try {
      // el token por headers. El carrito lo sacamos primeor de passport, luego de validar el token, para validar si no viene vacío.
      // El carrito hay que buscarlo sí o sí después de eso, para poder parsearlo.
      // Por post me manda el resto de la data: direction y payMethod.
      if (!req.user.shoppingCart.length)
        throw new Error("The shopping cart is empty.")

      // falta volver a validar si el stock alcanza!
      const user = await User.findOne({ _id: req.user._id })
        .populate({
          path: "shoppingCart.article",
          populate: { path: "brand gameType genres", select: "-__v -_id" },
          select: "-__v",
        })
        .select("shoppingCart")

      const total = user.shoppingCart.reduce(
        (total, item) => total + item.quantity * item.article.price,
        0
      )

      const parsedShoppingCart = user.shoppingCart.map((item) => ({
        ...item.article._doc,
        quantity: item.quantity,
      }))

      const purchase = new Purchase({
        user: req.user._id,
        articles: parsedShoppingCart,
        direction: req.body.direction,
        paymentMethod: req.body.paymentMethod,
        total,
      })
      await purchase.save()
      await Promise.all(
        user.shoppingCart.map((item) =>
          Article.findOneAndUpdate(
            { _id: item.article._id.toString() },
            { $inc: { stock: -item.quantity } }
          )
        )
      )
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { shoppingCart: [] } }
      )

      // enviar mail, generar la factura, etc.
      res.json({
        success: true,
        response: purchase,
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  deletePurchase: async (req, res) => {
    try {
      const purchase = await Purchase.findOneAndDelete({ _id: req.params.id })
      res.json({ success: true, response: purchase, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getPurchases: async (req, res) => {
    try {
      const purchases = await Purchase.find()
      res.json({ success: true, response: purchases, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getPurchaseById: async (req, res) => {
    try {
      const purchase = await Purchase.findOne({ _id: req.params.id })
      res.json({ success: true, response: purchase, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = purchaseControllers
