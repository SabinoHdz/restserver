const Joi = require("joi");
const name = Joi.string();
const price = Joi.number();
const description = Joi.string();
const category = Joi.string().custom(validateMongoId, "Mongo DB ID");
const available = Joi.boolean();
const id = Joi.string().custom(validateMongoId, "MongoDB ID");
const offset = Joi.number().integer();
const limit = Joi.number().integer();

// Función personalizada para validar un ID de MongoDB
function validateMongoId(value, helpers) {
  if (!/^[0-9a-fA-F]{24}$/.test(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price,
  available,
  category: category.required(),
});

const updateProductSchema = Joi.object({
  name,
  description,
  price,
  available,
  category:category.required(),
});
const getProductSchema = Joi.object({
  id: id.required(),
});
const queryProductSchema = Joi.object({
  limit,
  offset,
});
module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
