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

describe("test for app", () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = new Server();
    app.listen();
    api = request(app.app);
  });

  test("GET /hello", async () => {
    const response = await api.get("/hello");

    expect(response).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual("sabino");
    expect(response.headers["content-type"]).toMatch(/json/);
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
