const { ObjectId } = require("mongoose").Types;
const { Users, Category, Product } = require("./../models/index");
class SearchService {
  async usuarios(termino) {
    const isMongoID = ObjectId.isValid(termino);
    if (isMongoID) {
      const usuario = await Users.findById(termino);
      return usuario ? [usuario] : [];
    }
    const regex = new RegExp(termino, "i");
    const usuarios = await Users.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ status: true }],
    });
    return usuarios;
  }

  async categorias(termino) {
    const isMongoID = ObjectId.isValid(termino);
    if (isMongoID) {
      const categoria = await Category.findById(termino);
      return categoria ? [usuario] : [];
    }
    const regex = new RegExp(termino, "i");
    const categorias = await Category.find({ name: regex, status: true });
    return categorias;
  }
  async productos(termino) {
    const isMongoID = ObjectId.isValid(termino);
    if (isMongoID) {
      const usuario = await Product.findById(termino);
      return usuario ? [usuario] : [];
    }
    const regex = new RegExp(termino, "i");
    const usuarios = await Product.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ status: true }],
    });
    return usuarios;
  }
}

module.exports = SearchService;
