const Purchase = require("../models/Purchase")
const User = require("../models/User")
const Article = require("../models/Article")

const purchaseControllers = {
  handlePurchase: async (req, res) => {
    try {
      // el token por headers. Sacamos el carrito del modelo de usuario. Por post me manda el resto de la data.
      const user = await User.findOne({ _id: req.user._id })
        .populate({
          path: "shoppingCart.article",
          populate: { path: "brand gameType genres", select: "-__v -_id" },
          select: "-__v",
        })
        .select("shoppingCart")
      // console.log(
      //   user.shoppingCart.map((item) => ({
      //     ...item.article._doc,
      //     quantity: item.quantity,
      //   }))
      // )

      // const purchase = new Purchase({
      //   user: req.user._id,
      //   articles: user.shoppingCart.map((item) => ({
      //     ...item.article._doc,
      //     quantity: item.quantity,
      //   })),
      //   direction: ,
      // })
      res.json({
        success: true,
        response: user.shoppingCart.map((item) => ({
          ...item.article._doc,
          quantity: item.quantity,
        })),
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
}

module.exports = purchaseControllers
