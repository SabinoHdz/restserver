const express = require("express");
const {
  getUsers,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/user.controller");
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require("./../dtos/user.dto");
const { validatorHandler } = require("./../middlewares/validator.handler");
const { validarJWT } = require("../middlewares/validar-jwt");
const { isAdminRole, hasRole } = require("../middlewares/validar-roles");

const router = express.Router();
router.get("/", getUsers);
router.post("/", validatorHandler(createUserSchema, "body"), userPost);
router.put(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  userPut
);
//router.patch("/", getUsers);
router.delete(
  "/:id",
  validarJWT,
  hasRole('USER_ROLE','ADMIN_ROLE','SALES_ROLE'),
  isAdminRole,
  validatorHandler(getUserSchema, "params"),
  userDelete
);

module.exports = router;
