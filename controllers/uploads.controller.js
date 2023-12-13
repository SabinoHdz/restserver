const path = require("path");
const fs = require("fs");
const { response, request } = require("express");
const boom = require("@hapi/boom");
const { subirArchivo } = require("../utils/subir-archivo");
const { Users, Product } = require("./../models");

const cargaArchivo = async (req = request, res = response, next) => {
  try {
    // if (!req.files || Object.keys(req.files).length === 0) {
    //   //   res.status(400).send("No files were uploaded.");
    //   console.log("entro al error de no subir archivos");
    //   throw boom.badRequest("No hay archivos que subir");
    // }
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
    // if (
    //   !req.files ||
    //   Object.keys(req.files).length === 0 ||
    //   !req.files.archivo
    // ) {
    //   //   res.status(400).send("No files were uploaded.");
    //   console.log("entro al error de no subir archivos");
    //   throw boom.badRequest("No hay archivos que subir");
    // }
    console.log({ files: req.files });
    let model;
    switch (coleccion) {
      case "usuarios":
        model = await Users.findById(id);
        if (!model) {
          throw boom.badRequest("No existe un usuario con id");
        }

        break;
      case "productos":
        model = await Product.findById(id);
        if (!model) {
          throw boom.badRequest("No existe un producto con id");
        }

        break;

      default:
        throw boom.internal("No esta la opcion");
    }
    //Limpiar imagenes previas
    if (!!model.image) {
      //Hay que borrar la imagen
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        coleccion,
        model.image
      );
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }
    const name = await subirArchivo(req.files, undefined, coleccion);
    model.image = name;
    await model.save();
    res.json({ id, coleccion, model });
  } catch (error) {
    next(error);
  }
};
const mostrarImagen = async (req, res = response, next) => {
  try {
    const { id, coleccion } = req.params;
    let model;
    switch (coleccion) {
      case "usuarios":
        model = await Users.findById(id);
        if (!model) {
          throw boom.badRequest("No existe un usuario con id");
        }

        break;
      case "productos":
        model = await Product.findById(id);
        if (!model) {
          throw boom.badRequest("No existe un producto con id");
        }

        break;

      default:
        throw boom.internal("No esta la opcion");
    }
    if (!!model.image) {
      //Hay que borrar la imagen
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        coleccion,
        model.image
      );
      if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen);
      }
    }
    res.status(200).json({ message: "Falta el placeholder" });
  } catch (error) {}
};
module.exports = {
  cargaArchivo,
  actualizarImagen,
  mostrarImagen,
};
