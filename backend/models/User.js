const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({})

const User = mongoose.model("user", userSchema)

module.exports = User
