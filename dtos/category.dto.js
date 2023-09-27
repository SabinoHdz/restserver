const Joi = require("joi");
const name = Joi.string();
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

const createCategorySchema = Joi.object({
  name: name.required(),
});

const updateCategorySchema = Joi.object({
  name:name.required(),
});
const getCategorySchema = Joi.object({
  id: id.required(),
});
const queryCategorySchema = Joi.object({
  limit,
  offset,
});
module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  queryCategorySchema,
};
