const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");
const User = require("./../models/user.model");
const { generarJWT } = require("../utils/generar-jwt");
const login = async (req, res, next) => {
  try {
    const { body } = req;
    //verificar si el email existe
    const usuario = await User.findOne({ email: body.email });
    console.log("user: ", usuario);
    if (!usuario) {
      throw boom.badRequest("El usuario o contraseña no son correctos");
    }
    //si el usuario esta activo
    if (!usuario.status) {
      throw boom.badRequest("El usuario no existe");
    }

    //verificar la contraseña
    const validPassword = bcrypt.compareSync(body.password, usuario.password);
    if (!validPassword) {
      throw boom.badRequest("El usuario o password son incorrectos - pass");
    }
    //Generar JWT
    const token=await generarJWT(usuario.id)
    res.json({
        usuario,
        token
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
