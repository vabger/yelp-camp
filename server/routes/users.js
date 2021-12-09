const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  loginUser,
  logOutUser,
  currentUser,
} = require("../controllers/users");
const authenticateUser = require("../middlewares/authenticateUser");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.post("/", createUser);
router.get("/", authenticateUser, verifyAdmin, getUsers);
router.post("/login", loginUser);
router.get("/logout", authenticateUser, logOutUser);
router.get("/current", authenticateUser, currentUser);

module.exports = router;
