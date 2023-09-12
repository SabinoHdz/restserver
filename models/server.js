const express = require("express");
const cors = require("cors");
const routerApi = require("./../routes/index");
const { dbConecction } = require("../database/config");
const {
  logErrors,
  boomErrorHandler,
  errorHandler,
} = require("./../middlewares/error.handler");
class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();
    //connecion
    this.conectarDataBase();
    //Middlewares
    this.middlewares();
    //Rutas o router
    this.routes();

    this.app.use(logErrors);
    this.app.use(boomErrorHandler);
    this.app.use(errorHandler);
  }

  routes() {
    routerApi(this.app);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puertoS", this.port);
    });
  }
  middlewares() {
    //cors
    this.app.use(cors());
    //lectura y parseo
    this.app.use(express.json());
  }
  async conectarDataBase() {
    await dbConecction();
  }
}

module.exports = Server;
