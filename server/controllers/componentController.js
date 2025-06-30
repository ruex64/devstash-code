const Component = require("../models/Component");
const generateSlug = require("../utils/generateSlug");

exports.createComponent = async (req, res) => {
  try {
    const {
      name,
      description = "",
      tags = [],
      command = "",
      codeFiles = [],
      image = "",
      version = "1.0.0",
    } = req.body;

    if (!name || !codeFiles.length) {
      return res.status(400).json({ message: "Name and at least one code file are required." });
    }

    const slug = generateSlug(name);
    const existing = await Component.findOne({ slug });
    if (existing) {
      return res.status(409).json({ message: "A component with this name already exists." });
    }

    const component = await Component.create({
      name,
      slug,
      description,
      image,
      version,
      tags: Array.isArray(tags) ? tags : tags.split(",").map(t => t.trim()),
      command,
      codeFiles,
      creator: req.user.id,
    });

    res.status(201).json(component);
  } catch (err) {
    console.error("Create Component Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getAllComponents = async (req, res) => {
  try {
    const components = await Component.find()
      .populate("creator", "name avatar")
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(components);
  } catch (err) {
    console.error("Get All Components Error:", err);
    res.status(500).json({ message: "Failed to fetch components" });
  }
};
