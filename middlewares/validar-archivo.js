const boom = require("@hapi/boom");

const validarArchivo = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    //   res.status(400).send("No files were uploaded.");
    console.log("entro al error de no subir archivos");
    throw boom.badRequest("No hay archivos que subir - validar archivo");
  }
  next();
};
module.exports = validarArchivo;
