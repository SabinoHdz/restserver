const jwt = require("jsonwebtoken");
const boom = require("@hapi/boom");
const User = require("../models/user.model");

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    throw boom.unauthorized("No hay token en la petición");
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
    const usuario = await User.findById(uid);

    if (!usuario) {
      throw boom.notFound("El usuario no existe");
    }
    //verificar si el uid tiene el status ture
    if (!usuario.status) {
      throw boom.unauthorized("Token no valido- not user");
    }
    req.usuario = usuario;
    // req.uid = uid;
    next();
  } catch (error) {
    const errorTokenNoValido = boom.unauthorized("Token no válido");
    return next(errorTokenNoValido);
  }
};
module.exports = { validarJWT };
