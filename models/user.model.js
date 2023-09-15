const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "el nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "el email es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "el password es obligatorio"],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: [true],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const {_id, __v, password, ...usuario } = this.toObject();
  usuario.uid=_id;
  return usuario;
};
module.exports = model("Users", userSchema);
