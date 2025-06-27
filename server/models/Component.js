const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: String,
  image: String, // Cloudinary URL
  version: { type: String, default: "1.0.0" },
  tags: [String],
  command: String, // CLI command or install command
  codeFiles: [
    {
      filename: String,   // e.g. Button.jsx
      fileType: String,   // js, jsx, css, html, tsx
      code: String,
    },
  ],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Component", componentSchema);
