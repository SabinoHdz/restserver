const jwt = require("jsonwebtoken");
const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          reject("No se pudo generar el tocket");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };
