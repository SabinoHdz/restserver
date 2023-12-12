const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
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
    //Directorio publico
    this.app.use(express.static("public"));
    //Carga de archivo
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
        limits: { fileSize: 50 * 1024 * 1024 }, // Establece el límite del tamaño del archivo a 50 MB
      })
    );
  }
  async conectarDataBase() {
    await dbConecction();
  }
}

module.exports = Server;
