const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct
} = require("../controllers/product.controller");
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
} = require("./../dtos/product.dto");
const { validatorHandler } = require("./../middlewares/validator.handler");
const { validarJWT } = require("../middlewares/validar-jwt");
const { isAdminRole, hasRole } = require("../middlewares/validar-roles");
const { getCategorySchema } = require("../dtos/category.dto");

const router = express.Router();
router.get("/", validatorHandler(queryProductSchema,"query"), getProducts);
router.get("/:id",validatorHandler(getProductSchema,"params"), getProduct);
router.post("/",validarJWT, validatorHandler(createProductSchema, "body"), createProduct);
router.put(
  "/:id",
  validarJWT,
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  updateProduct
);
//router.patch("/", getUsers);
router.delete(
  "/:id",
  validarJWT,
  isAdminRole,
  validatorHandler(getCategorySchema, "params"),
  removeProduct
);

module.exports = router;
