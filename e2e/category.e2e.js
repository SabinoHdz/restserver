require("dotenv").config();
const request = require("supertest");
// const app = express();
// app.get("/hello", (req, res) => {
//   res.status(200).json({
//     name: "sabino",
//   });
// });

// const server = app.listen(9000);

// const api = request(app);

const Server = require("../models/server");

describe("test /categorias path", () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = new Server();
    app.listen();
    api = request(app.app);
  });

  describe('GET /categorias',()=>{
    //test for /categorias
  })
   describe("POST /categorias", () => {
     test('deberia retorna un 400 Bad request',async()=>{
        //AAA
        //Arrange
        const inputData={
            name:223
        }
        //Act
       const response=await api.post('/api/categorias').send(inputData);

        //Assert
        expect(response.statusCode).toBe(400)

     });
   });

   describe("PUT /categorias", () => {
     //test for /categorias
   });
  // afterEach(() => {
  //   server.close();
  // });

  afterAll((done) => {
    app.server.close((err) => {
      if (err) {
        console.error("Error al cerrar el servidor:", err);
      } else {
        console.log("Servidor cerrado después de las pruebas");
      }
      done();
    });
  });
});
