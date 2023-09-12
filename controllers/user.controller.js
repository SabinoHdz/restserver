const { response, request } = require("express");
const UserService = require("./../services/user.service");

const service = new UserService();
const getUsers = async (req = request, res = response, next) => {
  try {
    const users = await service.find();

    res.status(200).json({
      usuarios: users.usuarios,
      total: users.total,
    });
  } catch (error) {
    next(error);
  }
};
const userPost = async (req, res, next) => {
  try {
    const { body } = req;

    const newUser = await service.create(body);

    res.status(200).json({
      message: "post API",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

const userPut = async (req, res, next) => {
  // const { query } = req;
  try {
    const { body } = req;
    const { id } = req.params;
    let updUser = await service.update(id, body);
    res.status(200).json({
      message: "put API",
      body: updUser,
    });
  } catch (error) {
    next(error);
  }
};
const userDelete = async (req, res = response, next) => {
  try {
    const { id } = req.params;
    const updUser = await service.delete(id);
    res.status(200).json({
      message: "delete API",
      updUser,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getUsers,
  userPost,
  userPut,
  userDelete,
};
