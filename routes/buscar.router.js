const express = require("express");
const router = express.Router();
const { search } = require("../controllers/buscar.controller");
router.get("/:coleccion/:termino", search);
module.exports = router;
