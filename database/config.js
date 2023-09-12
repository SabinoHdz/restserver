const mongoose = require("mongoose");
const dbConecction = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de datos online");
  } catch (error) {
    console.log("errro...: ", error);
    throw new Error("Error en la base de datos");
  }
};

module.exports = {
  dbConecction,
};
