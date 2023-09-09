const express = require("express");
const cors = require("cors");
const routerApi = require("./../routes/index");
class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();
    //Middlewares
    this.middlewares();
    //Rutas o router
    this.routes();
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
    this.app.use(express.json())
  }
}

module.exports = Server;
