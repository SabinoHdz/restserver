const express = require("express");
const router = express.Router();
const { validatorHandler } = require("../middlewares/validator.handler");
const {
  cargaArchivo,
  actualizarImagen,
} = require("../controllers/uploads.controller");

router.post('/',cargaArchivo);
router.put('/:coleccion/:id',actualizarImagen)
module.exports = router;
