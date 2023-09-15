const Joi = require("joi");
const customMessages = {
  "string.email": "El campo {{#label}} debe ser un correo electrónico válido.",
  "string.min":
    "El campo {{#label}} debe tener al menos {{#limit}} caracteres.",
  "string.max":
    "El campo {{#label}} debe tener como máximo {{#limit}} caracteres.",
  "any.required": "El campo {{#label}} es obligatorio.",
};
const email = Joi.string().email().required().messages(customMessages);
const password = Joi.string()
  .min(8)
  .max(20)
  .required()
  .messages(customMessages);
const validateUser = Joi.object({
  email,
  password,
});
module.exports = { validateUser };
