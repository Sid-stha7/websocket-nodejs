const express = require("express");

const router = express.Router();

const {
  registerUser,
  login,
  findUser,
  getUsers,
} = require("../Controller/userController");
router.post("/register", registerUser);
router.post("/login", login);
router.get("/", getUsers);
router.get("/findUser/:userId", findUser);

module.exports = router;
