const boom = require("@hapi/boom");
const isAdminRole = (req, res, next) => {
  try {
    if (!req.usuario) {
      throw boom.badRequest("Se quiere verificar el rol sin validar el token");
    }
    const { role, name } = req.usuario;

    if (role !== "ADMIN_ROLE") {
      throw boom.unauthorized("No tienes los permisos para borrar");
    }
    next();
  } catch (error) {
    next(error);
  }
};
const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      throw boom.badRequest("Se quiere verificar el rol sin validar el token");
    }
    if (!roles.includes(req.usuario.role)) {
      throw boom.badRequest(
        "El servicio require uno de estos valores: ",
        roles
      );
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
