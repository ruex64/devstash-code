const express = require("express");
const router = express.Router();
const {
  createComponent,
  getAllComponents,
  getComponentBySlug,
  deleteComponent,
} = require("../controllers/componentController");
const { verifyAccessToken } = require("../middleware/auth");

// Create a new component
router.post("/", verifyAccessToken, createComponent);

// Get all components
router.get("/", getAllComponents);

// Get a single component by slug
router.get("/:slug", getComponentBySlug);

// Delete a component by slug (only creator or admin can delete)
router.delete("/:slug", verifyAccessToken, deleteComponent);

module.exports = router;
