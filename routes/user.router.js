const express = require("express");
const {
  getUsers,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/user.controller");
const router = express.Router();
router.get("/", getUsers);

router.put("/", userPut);
//router.patch("/", getUsers);
router.post("/", userPost);
router.delete("/", userDelete);

module.exports = router;
