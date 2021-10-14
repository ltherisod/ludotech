const joi = require("joi")

const articleValidator = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().trim().min(2).required().messages({
      "any.required": "The name of the game is required.",
      "string.empty": "The name of the game is required.",
      "string.min": "The name of the game must be at least 2 characters long.",
    }),
    brand: joi.string().trim().min(2).required().messages({
      "any.required": "The brand of the game is required.",
      "string.empty": "The brand of the game is required.",
      "string.min": "The brand of the game must be at least 2 characters long.",
    }),
    price: joi.number().min(2).required().messages({
      "any.required": "The price of the game is required.",
      "number.empty": "The price of the game is required.",
      "number.min": "The price of the game must be at least 2 characters long.",
    }),
    stock: joi.number().min(2).required().messages({
      "any.required": "The stock of the game is required.",
      "number.empty": "The stock of the game is required.",
      "number.min": "The stock of the game must be at least 2 characters long.",
    }),
    hasDiscount: joi.bool().optional(),
    discountPrice: joi.number().optional(),
    photos: joi.array().items(joi.string()).optional(),
    genres: joi.array().items(joi.string()).optional(),
    gameType: joi.string().optional(),
    minPlayers: joi.number().optional(),
    maxPlayers: joi.number().optional(),
    minAge: joi.number().optional(),
    size: joi.string().optional(), //revisar
    weight: joi.number().optional(),
    video: joi.string(),
    iconPhotos: joi.string(),
    decoPhotos: joi.any().optional(),
    visitsCount: joi.number(),
    videoId: joi.string(),
    description: joi.string(),
    playingTime: joi.number(),
  })

  const validations = schema.validate(req.body, { abortEarly: false })
  if (!validations.error) {
    next()
  } else {
    res.json({ success: false, errors: validations.error.details })
  }
}

const articleUpdateValidator = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().trim().min(2).required().messages({
      "any.required": "The name of the game is required.",
      "string.empty": "The name of the game is required.",
      // 'string.base': 'The name of the game must be a string',
      "string.min": "The name of the game must be at least 2 characters long.",
    }),
    brand: joi.string().trim().min(2).required().messages({
      "any.required": "The brand of the game is required.",
      "string.empty": "The brand of the game is required.",
      // 'string.base': 'The name of the game must be a string',
      "string.min": "The brand of the game must be at least 2 characters long.",
    }),
    price: joi.number().min(2).required().messages({
      "any.required": "The price of the game is required.",
      "number.empty": "The price of the game is required.",
      "number.min": "The price of the game must be at least 2 characters long.",
    }),
    stock: joi.number().min(2).required().messages({
      "any.required": "The price of the game is required.",
      "number.empty": "The stock of the game is required.",
      "number.min": "The price of the game must be at least 2 characters long.",
    }),
    hasDiscount: joi.bool().optional(),
    discountPrice: joi.number().optional(),
    photos: joi.array().items(joi.string()).optional(),
    genres: joi.array().items(joi.string()).optional(),
    gameType: joi.string().optional(),
    minPlayers: joi.number().optional(),
    maxPlayers: joi.number().optional(),
    minAge: joi.number().optional(),
    size: joi.string().optional(), //revisar
    weight: joi.number().optional(),
    video: joi.string(),
    iconPhotos: joi.string(),
    decoPhotos: joi.any().optional(),
    visitsCount: joi.number(),
    videoId: joi.string(),
    description: joi.string(),
    playingTime: joi.number(),
  })

  const validations = schema.validate(req.body, { abortEarly: false })
  if (!validations.error) {
    next()
  } else {
    res.json({ success: false, errors: validations.error.details })
  }
}

module.exports = { articleValidator, articleUpdateValidator }
