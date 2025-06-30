const express = require("express");
const router = express.Router();
const {
  createComponent,
  getAllComponents,
} = require("../controllers/componentController");
const { verifyAccessToken } = require("../middleware/auth");

router.post("/", verifyAccessToken, createComponent);
router.get("/", getAllComponents);

module.exports = router;
