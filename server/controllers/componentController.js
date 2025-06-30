const Component = require("../models/Component");

// Create a new component
exports.createComponent = async (req, res) => {
  try {
    const { name, slug, tags, image, code, fileType, version, commands } = req.body;

    const component = await Component.create({
      name,
      slug,
      tags,
      image,
      code,
      fileType,
      version,
      commands,
      creator: req.user.id || req.user._id,
    });

    res.status(201).json(component);
  } catch (error) {
    console.error("Create Component Error:", error);
    res.status(500).json({ message: "Failed to create component" });
  }
};

// Get all components
exports.getAllComponents = async (req, res) => {
  try {
    const components = await Component.find().populate("creator", "name avatar");
    res.json(components);
  } catch (error) {
    console.error("Get All Components Error:", error);
    res.status(500).json({ message: "Failed to fetch components" });
  }
};

// Get single component by slug
exports.getComponentBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const component = await Component.findOne({ slug }).populate("creator", "name avatar");

    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    res.json(component);
  } catch (error) {
    console.error("Get Component Error:", error);
    res.status(500).json({ message: "Failed to fetch component" });
  }
};
