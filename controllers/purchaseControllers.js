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

         const user = await User.findOne({ _id: req.user._id })
            .populate({
               path: "shoppingCart.article wishList",
               populate: { path: "brand gameType genres", select: "name -_id" },
               select: "-__v",
            })
            .select("shoppingCart wishList")

         // validar stock.
         user.shoppingCart.forEach((item) => {
            if (item.article.stock < item.quantity) {
               throw new Error(
                  `Error. The article ${item.article.name} ${
                     item.article.stock
                        ? `only has ${item.article.stock} units, and you tried to buy ${item.quantity}`
                        : "is out of stock."
                  }`
               )
            }
         })

         // calcular total (?)
         const total = user.shoppingCart.reduce(
            (total, item) =>
               item.hasDiscount
                  ? total + item.quantity * item.article.discountPrice
                  : total + item.quantity * item.article.price,
            0
         )

         // parsear el shopping cart a la forma en que lo toma el modelo purchase.
         const parsedShoppingCart = user.shoppingCart.map((item) => ({
            ...item.article._doc,
            genres: item.article.genres.map((g) => g.name),
            brand: item.article.brand.name,
            gameType: item.article.gameType.name,
            quantity: item.quantity,
         }))

         // crear la compra
         const purchase = await new Purchase({
            user: req.user._id,
            articles: parsedShoppingCart,
            direction: req.body.direction,
            paymentDetails: req.body.paymentDetails,
            total,
         }).save()

         // actualizar stock
         await Promise.all(
            user.shoppingCart.map((item) =>
               Article.findOneAndUpdate(
                  { _id: item.article._id.toString() },
                  { $inc: { stock: -item.quantity } }
               )
            )
         )

         // actualizar wish list y shopping cart.
         user.wishList = user.wishList.filter((wishItem) =>
            user.shoppingCart.every(
               (cartItem) =>
                  cartItem.article._id.toString() !== wishItem._id.toString()
            )
         )
         user.shoppingCart = []
         await user.save()

         // enviar mail, generar la factura, etc.

         res.json({
            success: true,
            response: { purchase, user },
            error: null,
         })
      } catch (e) {
         res.json({ success: false, response: null, error: e.message })
      }
   },
   deletePurchase: async (req, res) => {
      try {
         // no deberíamos usar esto, esta para pruebas.
         const purchase = await Purchase.findOneAndDelete({
            _id: req.params.id,
         })
         res.json({ success: true, response: purchase, error: null })
      } catch (e) {
         res.json({ success: false, response: null, error: e.message })
      }
   },
   getPurchases: async (req, res) => {
      try {
         const purchases = await Purchase.find().populate(
            "user",
            "-password -__v"
         )
         res.json({ success: true, response: purchases, error: null })
      } catch (e) {
         res.json({ success: false, response: null, error: e.message })
      }
   },
   getPurchaseById: async (req, res) => {
      try {
         const purchase = await Purchase.findOne({
            _id: req.params.id,
         }).populate("user", "-password -__v")
         res.json({ success: true, response: purchase, error: null })
      } catch (e) {
         res.json({ success: false, response: null, error: e.message })
      }
   },
   getPurchasesByUserId: async (req, res) => {
      try {
         const { userId } = req.params
         const purchases = await Purchase.find({ user: userId }).populate(
            "user",
            "-password -__v"
         )
         res.json({ success: true, response: purchases, error: null })
      } catch (e) {
         res.json({ success: false, response: null, error: e.message })
      }
   },
   updateStatus: async (req, res) => {
      try {
         const { purchaseId } = req.params
         const { status } = req.body
         if (
            ![
               "completed",
               "shipping",
               "confirmed",
               "processing",
               "cancelled",
            ].includes(status)
         )
            throw new Error("Invalid status.")
         const purchase = await Purchase.findOneAndUpdate(
            { _id: purchaseId },
            { status },
            { new: true }
         ).populate("user", "-password -__v")
         res.json({ success: true, response: purchase, error: null })
      } catch (e) {
         res.json({ success: false, response: null, error: e.message })
      }
   },
}

module.exports = purchaseControllers
