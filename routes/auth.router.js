const express = require("express");
const router = express.Router();
const { login, googleSingIn } = require("../controllers/auth.controller");
const { validatorHandler } = require("../middlewares/validator.handler");
const { validateUser } = require("../dtos/auth.dto");
router.post("/login", validatorHandler(validateUser, "body"), login);

router.post("/google", googleSingIn);
module.exports = router;
