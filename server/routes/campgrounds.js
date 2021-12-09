const express = require("express");
const path = require("path");
const multer = require("multer");

const {
  getAllCampgrounds,
  getCampgroundById,
  addCampground,
  updateCampground,
  deleteCampground,
} = require("../controllers/campgrounds");

const imageUpload = require("../utils/imageUpload");

const authenticateUser = require("../middlewares/authenticateUser");
const verifyAdmin = require("../middlewares/verifyAdmin");
const getCampground = require("../middlewares/getCampground");

const router = express.Router();

router.get("/", getAllCampgrounds);
router.get("/:id", getCampground, getCampgroundById);
router.post(
  "/",
  authenticateUser,
  verifyAdmin,
  imageUpload(path.join(__dirname, "../images/uploads/campgrounds")).array(
    "images",
    10
  ),
  addCampground
);
router.patch("/:id", authenticateUser, getCampground, updateCampground);
router.delete("/:id", authenticateUser, getCampground, deleteCampground);

module.exports = router;
