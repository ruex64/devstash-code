const express = require("express");
const router = express.Router();
const { createComponent } = require("../controllers/componentController");
const { verifyAccessToken } = require("../middleware/auth");

router.post("/", verifyAccessToken, createComponent);

module.exports = router;
