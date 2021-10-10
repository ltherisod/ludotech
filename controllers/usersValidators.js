const joi = require("joi")

const signUpValidator = async (req, res, next) => {
   const schema = joi.object({
      firstname: joi.string().trim().min(2).required().messages({
         "any.required": "First name is required",
         "string.min": "First name must have at least two characters.",
      }),
      lastname: joi.string().trim().min(2).required().messages({
         "any.required": "Last name is required.",
         "string.min": "Last name must have at least two characters.",
      }),
      email: joi.string().email().required().messages({
         "any.required": "Email is required.",
         "string.email": "Invalid email.",
      }),
      password: joi
         .string()
         .min(4)
         //   .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
         .required()
         .messages({
            "any.required": "Password is required.",
            "string.min": "Password must have at least 4 characters.",
            // "string.pattern.base":
            //   "Must have at least one lowercase, one uppercase and one digit.",
         }),
      photo: joi.any().required().messages({
         "any.required": "Photo is required.",
      }),
      google: joi.boolean().optional(),
   })

   try {
      await schema.validateAsync(req.body, { abortEarly: false })
      next()
   } catch (e) {
      res.json({ success: false, response: null, error: e.details })
   }
}

const updateAccountValidator = async (req, res, next) => {
   const schema = joi.object({
      firstname: joi.string().trim().min(2).messages({
         "string.min": "First name must have at least two characters.",
      }),
      lastname: joi.string().trim().min(2).messages({
         "string.min": "Last name must have at least two characters.",
      }),
      email: joi.string().email().messages({
         "string.email": "Invalid email.",
      }),
      password: joi
         .string()
         .min(4)
         //   .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
         .messages({
            "string.min": "Password must have at least 4 characters.",
            // "string.pattern.base":
            //   "Must have at least one lowercase, one uppercase and one digit.",
         }),
      photo: joi.string(),
      phone: joi.number(),
   })
   try {
      await schema.validateAsync(req.body, { abortEarly: false })
      next()
   } catch (e) {
      res.json({ success: false, response: null, error: e.details })
   }
}

const addDirectionsValidator = async (req, res, next) => {
   const schema = joi.object({
      alias: joi.string().trim().min(2).required().messages({
         "any.required": "Alias is required.",
         "string.min": "Alias must have at least two characters.",
      }),
      receiver: joi.string().trim().min(2).messages({
         "any.required": "Receiver name is required.",
         "string.min": "Receiver must have at least two characters.",
      }),
      street: joi.string().required().messages({
         "any.required": "Street is required.",
      }),
      number: joi.number().required().messages({
         "any.required": "Number is required.",
      }),
      department: joi.string().required().messages({
         "any.required": "Department is required.",
      }),
      zipCode: joi.string().required().messages({
         "any.required": "Zip Code is required.",
      }),
      city: joi.string().required().messages({
         "any.required": "City is required.",
      }),
      state: joi.string().required().messages({
         "any.required": "State is required.",
      }),
   })
   try {
      await schema.validateAsync(req.body, { abortEarly: false })
      next()
   } catch (e) {
      res.json({ success: false, response: null, error: e.details })
   }
}

const updateDirectionsValidator = async (req, res, next) => {
   const schema = joi.object({
      alias: joi.string().trim().min(2).messages({
         "string.min": "Alias must have at least two characters.",
      }),
      receiver: joi.string().trim().min(2).messages({
         "string.min": "Receiver must have at least two characters.",
      }),
      street: joi.string().min(2).messages({
         "string.min": "Street must have at least two characters.",
      }),
      number: joi.number(),
      department: joi.string(),
      zipCode: joi.string(),
      city: joi.string().min(2).messages({
         "string.min": "City must have at least two characters.",
      }),
      state: joi.string().min(2).messages({
         "string.min": "State must have at least two characters.",
      }),
   })
   try {
      await schema.validateAsync(req.body, { abortEarly: false })
      next()
   } catch (e) {
      res.json({ success: false, response: null, error: e.details })
   }
}

module.exports = {
   signUpValidator,
   updateAccountValidator,
   addDirectionsValidator,
   updateDirectionsValidator,
}
