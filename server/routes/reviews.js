const express = require("express");

const authenticateUser = require("../middlewares/authenticateUser");
const getCampground = require("../middlewares/getCampground");

const { postReview, getReviews } = require("../controllers/reviews");

const router = express.Router({ mergeParams: true });

router.post("/", authenticateUser, getCampground, postReview);
router.get("/", getCampground, getReviews);

module.exports = router;
