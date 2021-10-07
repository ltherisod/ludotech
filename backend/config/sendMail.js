const nodemailer = require("nodemailer")

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

module.exports = transporter