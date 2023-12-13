const express = require("express");
const router = express.Router();
const { validatorHandler } = require("../middlewares/validator.handler");
const {
  cargaArchivo,
  actualizarImagen,
  mostrarImagen,
} = require("../controllers/uploads.controller");
const { updateUploads } = require("../dtos/uploads.dto");
const validarArchivo = require("../middlewares/validar-archivo");

router.post("/", cargaArchivo);
router.put(
  "/:coleccion/:id",
  validarArchivo,
  validatorHandler(updateUploads, "params"),
  actualizarImagen
);
router.get(
  "/:coleccion/:id",
  validarArchivo,
  validatorHandler(updateUploads, "params"),
  mostrarImagen
);

module.exports = router;
