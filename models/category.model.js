const { Schema, model } = require("mongoose");

const categorySchema = Schema({
  name: {
    type: String,
    required: [true, "el rol es obligatorio"],
    unique: true,
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
});
categorySchema.methods.toJSON = function () {
  const { __v,status, ...categoria } = this.toObject();
  return categoria;
};
module.exports = model("Category", categorySchema);
