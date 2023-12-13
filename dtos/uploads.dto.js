const Joi = require("joi");
const id = Joi.string().custom(validateMongoId, "MongoDB ID");

// Función personalizada para validar un ID de MongoDB
function validateMongoId(value, helpers) {
  if (!/^[0-9a-fA-F]{24}$/.test(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}

const updateUploads = Joi.object({
  id: id.required(),
});

module.exports = {
  updateUploads,
};
