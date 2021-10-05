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
    photo: joi.string().required().messages({
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
    phone: joi.string(),
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (e) {
    res.json({ success: false, response: null, error: e.details })
  }
}

const addDirectionsValidator = async (req, res, next) => {
  console.log("Validar dirección...")
}

module.exports = {
  signUpValidator,
  updateAccountValidator,
}
