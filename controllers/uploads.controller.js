const { response, request } = require("express");
const boom = require("@hapi/boom");
const { subirArchivo } = require("../utils/subir-archivo");

const cargaArchivo = async (req = request, res = response, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      //   res.status(400).send("No files were uploaded.");
      console.log("entro al error de no subir archivos");
      throw boom.badRequest("No hay archivos que subir");
    }
    // const name=await subirArchivo(req.files,['md','txt'],'textos')
    const name = await subirArchivo(req.files, undefined, "images");

    res.json({
      name,
    });
  } catch (error) {
    next(error);
  }
  //   console.log(req.files); // the uploaded file object
  //   res.json({
  //     msg: "message createArchivo",
  //   });
};
const actualizarImagen = async (req = request, res = response, next) => {
  try {
    const { id, coleccion } = req.params;
  } catch (error) {
    next(error);
  }
};
module.exports = {
  cargaArchivo,
  actualizarImagen,
};
