const { Schema, model } = require("mongoose");

const productSchema = Schema({
  name: {
    type: String,
    required: [true, "el nombre es obligatorio"],
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },

  available: {
    type: Boolean,
    default: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: {
    type: String,
  },
});
productSchema.methods.toJSON = function () {
  const { __v, status, ...product } = this.toObject();
  return product;
};
module.exports = model("Product", productSchema);
