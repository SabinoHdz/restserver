const { response, request } = require("express");
const boom = require("@hapi/boom");
const { ObjectId } = require("mongoose").Types;
const { Users, Category, Product } = require("./../models/index");
const SearchService = require("./../services/search.service");
const searchService = new SearchService();
const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];
//Se cambio por un servicio a la BD 
// const buscarUsuarios = async (termino = "", res = response) => {
//   const isMongoID = ObjectId.isValid(termino);
//   if (isMongoID) {
//     const usuario = await Users.findById(termino);
//     res.json({ results: usuario ? [usuario] : [] });
//   }
//   const regex = new RegExp(termino, "i");
//   const usuarios = await Users.find({
//     $or: [{ name: regex }, { email: regex }],
//     $and: [{ status: true }],
//   });

//   res.json({ results: usuarios });
// };
const search = async (req = request, res = response, next) => {
  try {
    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
      throw boom.badRequest("Las coleccion no esta permitidad");
    }
    let resultados = [];
    switch (coleccion) {
      case "usuarios":
        resultados = await searchService.usuarios(termino);
        break;
      case "categorias":
        resultados = await searchService.categorias(termino);
        break;
      case "productos":
        resultados = await searchService.productos(termino);
        break;

      default:
        throw boom.badImplementation("No se ha realizado la implementacion");
    }
    res.json({ results: resultados });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  search,
};
