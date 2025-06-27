
const Component = require("../models/Component");
const generateSlug = require("../utils/generateSlug");

exports.createComponent = async (req, res) => {
  try {
    const {
      name,
      description,
      tags,
      command,
      codeFiles,
      image,
      version,
    } = req.body;

    const existing = await Component.findOne({ slug: generateSlug(name) });
    if (existing) {
      return res.status(409).json({ message: "Component name already exists" });
    }

    const component = await Component.create({
      name,
      slug: generateSlug(name),
      description,
      image,
      version,
      tags,
      command,
      codeFiles,
      creator: req.user.id, // comes from auth middleware
    });

    res.status(201).json(component);
  } catch (err) {
    console.error("Create Component Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
