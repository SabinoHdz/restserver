const express = require("express");
const usuariosRouter = require("./user.router");
const categoriasRouter = require("./category.router");
const productosRouter = require("./product.router");
const searchRouter = require("./buscar.router");
const uploadsRouter=require("./uploads.router")
const authRouter = require("./auth.router");
const { MODULE_PATH, ROUTE_NAME } = require("./../utils/const");
function routerApi(app) {
  const router = express.Router();
  app.use(MODULE_PATH.api, router);
  router.use(ROUTE_NAME.users, usuariosRouter);
  router.use("/categorias", categoriasRouter);
  router.use("/auth", authRouter);
  router.use("/productos", productosRouter);
  router.use("/search", searchRouter);
  router.use("/uploads",uploadsRouter)
}

module.exports = routerApi;
