const express = require("express");
const usuariosRouter = require("./user.router");
const categoriasRouter = require("./category.router");
const productosRouter=require('./product.router')
const authRouter = require("./auth.router");
const { MODULE_PATH, ROUTE_NAME } = require("./../utils/const");
function routerApi(app) {
  const router = express.Router();
  app.use(MODULE_PATH.api, router);
  router.use(ROUTE_NAME.users, usuariosRouter);
  router.use("/categorias", categoriasRouter);
  router.use("/auth", authRouter);
  router.use('/productos',productosRouter)
}

module.exports = routerApi;
