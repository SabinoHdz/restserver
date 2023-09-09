const { response, request } = require("express");
const getUsers = (req = request, res = response) => {
  res.status(200).json({
    message: "get API",
  });
};
const userPost = (req, res = response) => {
  const {body}=req;
    res.status(200).json({
    message: "post API",
    body
  });
};
const userPut = (req, res = response) => {
  const {query}=req;
    res.status(200).json({
    message: "put API",
    body:query
  });
};
const userDelete = (req, res = response) => {
  res.status(200).json({
    message: "delete API",
  });
};
module.exports = {
  getUsers,
  userPost,
  userPut,
  userDelete,
};
