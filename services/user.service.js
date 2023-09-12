const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");

const User = require("./../models/user.model");

class UserService {
  constructor() {}
  async find() {
    const query = { status: true };
    // const usuarios = await User.find(query);
    // const total = await User.countDocuments(query);
    const [total,usuarios] =await Promise.all([
      await User.countDocuments(query),
      await User.find(query),
    ]);
    return { usuarios, total };
  }
  async findOne(id) {
    const existUser = await User.findById(id);
    if (!existUser) {
      throw boom.notFound("El usuario no existe");
    }
    return existUser;
  }
  async create(body) {
    const usuario = new User(body);

    //Verificar si el correo existe
    let isExistEmail = await User.findOne({ email: body.email });
    if (isExistEmail) {
      throw boom.badRequest("El correo ya esta registrado");
    }
    //encriptar la contraseña
    usuario.password = bcrypt.hashSync(body.password, 10);
    usuario.save();
    return usuario;
  }
  async update(id, data) {
    const { _id, password, google, email, ...resto } = data;
    //verificar si existe el user
    await this.findOne(id);
    //TodoValidar contra la base de datos
    if (password) {
      resto.password = bcrypt.hashSync(password, 10);
    }
    const userUpdate = await User.findByIdAndUpdate(id, resto, { new: true });
    return userUpdate;
  }
  async delete(id) {
  await this.findOne(id);
  const userUpdate = await User.findByIdAndUpdate(id, {status:false}, { new: true });
    return userUpdate;
  }
}

module.exports = UserService;
