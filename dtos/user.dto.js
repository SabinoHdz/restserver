const Joi = require("joi");
const boom = require("@hapi/boom");
const Roles = require("../models/role.model");
const id = Joi.string().custom(validateMongoId, "MongoDB ID");
const name = Joi.string().min(5);
const email = Joi.string().email();
const password = Joi.string().min(8).max(20);
const image = Joi.string().min(5);
const role = Joi.string().valid("ADMIN_ROLE", "USER_ROLE");
//let role = Joi.string();
const status = Joi.boolean();
const google = Joi.boolean();
async function validateRole(role) {
  const existRole = await Roles.findOne({ role });
  if (!existRole) {
    throw boom.notFound(`El rol ${role} no se encontró en la base de datos`);
  }
  return role; // Retorna el valor validado si es correcto
}
// Función personalizada para validar un ID de MongoDB
function validateMongoId(value, helpers) {
  if (!/^[0-9a-fA-F]{24}$/.test(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  image,
  role: role.required(),
  status,
  google,
});

const updateUserSchema = Joi.object({
  name,
  email: email,
  password: password,
  image,
  role: role,
  status,
  google,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
