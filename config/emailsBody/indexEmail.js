const ConfirmationEmail = require('./ConfirmationEmail')
const DeleteAccount = require('./DeleteAccount')
const DeleteAccountConfirmation = require('./DeleteAccountConfirmation')
const FailPurchase = require('./FailPurchase')
const NewPassword = require('./NewPassword')
const ReSendConfirmationEmail = require('./ReSendConfirmationEmail')
const ResetPasswordConfirmation = require('./ResetPasswordConfirmation')
const SuccessPurchase = require('./SuccessPurchase')
const UserBillCheckout = require('./UserBillCheckout')
const Welcome = require('./Welcome')

module.exports = { 
  ConfirmationEmail, 
  DeleteAccount, 
  DeleteAccountConfirmation, 
  FailPurchase, 
  NewPassword, 
  ReSendConfirmationEmail,
  ResetPasswordConfirmation,
  SuccessPurchase,
  UserBillCheckout,
  Welcome 
}