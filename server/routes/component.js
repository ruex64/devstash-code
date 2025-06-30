const express = require("express");
const router = express.Router();
const {
  createComponent,
  getAllComponents,
  getComponentBySlug,
} = require("../controllers/componentController");
const { verifyAccessToken } = require("../middleware/auth");

router.post("/", verifyAccessToken, createComponent);     // Create component
router.get("/", getAllComponents);                        // All components
router.get("/:slug", getComponentBySlug);                 // Single component by slug

module.exports = router;
