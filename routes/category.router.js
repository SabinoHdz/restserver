const express = require("express");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category.controller");
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  queryCategorySchema
} = require("./../dtos/category.dto");
const { validatorHandler } = require("./../middlewares/validator.handler");
const { validarJWT } = require("../middlewares/validar-jwt");
const { isAdminRole, hasRole } = require("../middlewares/validar-roles");

const router = express.Router();
router.get("/", validatorHandler(queryCategorySchema,"query"), getCategories);
router.get("/:id",validatorHandler(getCategorySchema,"params"), getCategory);
router.post("/",validarJWT, validatorHandler(createCategorySchema, "body"), createCategory);
router.put(
  "/:id",
  validarJWT,
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  updateCategory
);
//router.patch("/", getUsers);
router.delete(
  "/:id",
  validarJWT,
  isAdminRole,
  validatorHandler(getCategorySchema, "params"),
  removeCategory
);

module.exports = router;
