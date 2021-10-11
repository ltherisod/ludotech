const joi = require("joi")

const purchaseValidator = async (req, res, next) => {
  const schema = joi.object({
    direction: joi
      .object({
        receiver: joi.string().required().messages({
          "any.required": "Receiver is required",
        }),
        street: joi.string().required({
          "any.required": "Street is required",
        }),
        number: joi.number().required({
          "any.required": "Number is required",
        }),
        department: joi.string().required({
          "any.required": "Department is required",
        }),
        zipCode: joi.string().required({
          "any.required": "zipCode is required",
        }),
        city: joi.string().required({
          "any.required": "City is required",
        }),
        state: joi.string().required({
          "any.required": "State is required",
        }),
      })
      .required(),
    paymentDetails: joi.object({
      method: joi.string().required().messages({
        "any.required": "method is required",
      }),
      orderId: joi.string().required().messages({
        "any.required": "orderId is required",
      }),
      receipt: joi.string().optional(),
    }),
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (e) {
    res.json({ success: false, response: null, error: e.details })
  }
}

module.exports = purchaseValidator
