const boom = require("@hapi/boom");
const { response, request } = require("express");
const { Product } = require("../models/index");

const getProducts = async (req = request, res = response, next) => {
  try {
    const { limit, offset } = req.query;
    const query = {
      status: true,
    };
    let queryBuilder = Product.find(query);
    if (limit && offset) {
      queryBuilder = queryBuilder.skip(Number(offset)).limit(Number(limit));
    }
    const [total, products] = await Promise.all([
      await Product.countDocuments(query),
      await queryBuilder.populate("user", "name").populate("category", "name"),
    ]);

    res.json({
      products,
      total,
    });
  } catch (error) {
    next(error);
  }
};
const getProduct = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const existProduct = await Product.findById(id)
      .populate("user", "name")
      .populate("category", "name");
    if (!existProduct) {
      throw boom.notFound("El producto no existe");
    }
    res.json(existProduct);
  } catch (error) {
    next(error);
  }
};
const createProduct = async (req, res, next) => {
  try {
    const { status, usuario, ...body } = req.body;

    const name = req.body.name;
    const ProductDB = await Product.findOne({ name });
    if (ProductDB) {
      throw boom.badRequest("El producto ya existe");
    }
    //Generar la data a guardar
    const data = {
      name,
      user: req.usuario._id,
      ...body,
    };
    const producto = new Product(data);
    await producto.save();
    // res.json("ok post category")
    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  // const { query } = req;
  try {
    const { status, usuario, ...data } = req.body;
    const { id } = req.params;
    const existProduct = await Product.findById(id);
    if (!existProduct) {
      throw boom.notFound("El producto no existe");
    }
    data.name = data.name.toUpperCase();
    data.user = req.usuario._id;
    const productUpdate = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json(productUpdate);
  } catch (error) {
    next(error);
  }
};
const removeProduct = async (req, res = response, next) => {
  try {
    const { id } = req.params;
    const existPorduct = await Product.findById(id);
    if (!existPorduct) {
      throw boom.notFound("El producto no existe");
    }
    const productUpdate = await Category.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.status(200).json(productUpdate);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
};
