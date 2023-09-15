const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth.controller");
const { validatorHandler } = require("../middlewares/validator.handler");
const { validateUser } = require("../dtos/auth.dto");
router.post("/", validatorHandler(validateUser, "body"), login);
module.exports = router;
