const express = require("express");
const {
  getUsers,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/user.controller");
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require("./../dtos/user.dto");
const { validatorHandler } = require("./../middlewares/validator.handler");

const router = express.Router();
router.get("/", getUsers);
router.post("/", validatorHandler(createUserSchema, "body"), userPost);
router.put(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  userPut
);
//router.patch("/", getUsers);
router.delete("/:id", validatorHandler(getUserSchema,'params'),userDelete);

module.exports = router;
