const request = require("supertest");
const express = require("express");

const app = express();
app.get("/hello", (req, res) => {
  res.status(200).json({
    name: "sabino",
  });
});

app.listen(9000);

const api = request(app);
describe("test for app", () => {
  test("GET /hello", async () => {
    const response = await api.get("/hello");

    expect(response).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual("sabino");
    expect(response.headers["content-type"]).toMatch(/json/);
  });
});
