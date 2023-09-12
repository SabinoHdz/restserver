const boom = require("@hapi/boom");

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    if (!schema || !schema.validate) {
      next(boom.badImplementation("Invalid schema"));
    }
    const { error } = schema.validate(data, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error) {
      next(boom.badRequest(error));
    } else {
      next();
    }
  };
}

module.exports = { validatorHandler };
