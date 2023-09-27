const boom = require("@hapi/boom");
const { response, request } = require("express");
const { Category } = require("../models/index");

const getCategories = async (req = request, res = response, next) => {
  try {
    const { limit, offset } = req.query;
    const query = {
      status: true,
    };
    let queryBuilder = Category.find(query);
    if (limit && offset) {
      queryBuilder = queryBuilder.skip(Number(offset)).limit(Number(limit));
    }
    const [total, categories] = await Promise.all([
      await Category.countDocuments(query),
      await queryBuilder.populate('user','name'),
    ]);

    res.json({
      categories,
      total,
    });
  } catch (error) {
    next(error);
  }
};
const getCategory = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const existCategory = await Category.findById(id).populate('user','name');
    if (!existCategory) {
      throw boom.notFound("La categoria no existe");
    }
    res.json(existCategory);
  } catch (error) {
    next(error);
  }
};
const createCategory = async (req, res, next) => {
  try {
    const name = req.body.name.toUpperCase();
    console.log("name: ", name);
    const categoryDB = await Category.findOne({ name });
    if (categoryDB) {
      throw boom.badRequest("La categoria ya existe");
    }
    //Generar la data a guardar
    const data = {
      name,
      user: req.usuario._id,
    };
    const categoria = new Category(data);
    await categoria.save();
    // res.json("ok post category")
    res.status(201).json(categoria);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  // const { query } = req;
  try {
    const { status,usuario,...data } = req.body;
    const { id } = req.params;
    const existCategory = await Category.findById(id);
    if (!existCategory) {
      throw boom.notFound("La categoria no existe");
    }
    data.name = data.name.toUpperCase();
    data.user=req.usuario._id;
    const userUpdate = await Category.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(userUpdate);
  } catch (error) {
    next(error);
  }
};
const removeCategory = async (req, res = response, next) => {
  try {
    const { id } = req.params;
    const existCategory = await Category.findById(id);
    if (!existCategory) {
      throw boom.notFound("La categoria no existe");
    }
    const categoryUpdate = await Category.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.status(200).json(categoryUpdate);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  removeCategory,
};
