const path = require("path");
const { v4: uuidv4 } = require("uuid");
const boom = require("@hapi/boom");

const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  console.log("Files; ", files);
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const splitName = archivo.name.split(".");
    const extension = splitName[splitName.length - 1];
    //validar la extension
    if (!extensionesValidas.includes(extension)) {
      return reject(boom.badRequest("La extesion no des valida aaaa"));
      //throw boom.badRequest();
    }
    const tempName = uuidv4() + "." + extension; // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

    let uploadPath = path.join(__dirname, "../uploads/", carpeta, tempName);

    archivo.mv(uploadPath, function (err) {
      if (err) {
        reject(err);
        //return res.status(500).json({ err });
      }

      //res.json({ msg: "File uploaded to " + uploadPath });
      resolve(tempName);
    });
  });
};

module.exports = {
  subirArchivo,
};
