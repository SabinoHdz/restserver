const express = require("express");
const usuariosRouter = require("./user.router");
const { MODULE_PATH, ROUTE_NAME } = require("./../utils/const");
function routerApi(app) {
  const router = express.Router();
  app.use(MODULE_PATH.api, router);
  router.use(ROUTE_NAME.users, usuariosRouter);
}

module.exports = routerApi;
