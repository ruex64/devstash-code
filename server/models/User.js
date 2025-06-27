const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String },
  avatar: String,
  role: { type: String, enum: ["viewer", "collaborator", "admin"], default: "viewer" },
  provider: { type: String, enum: ["local", "google", "github"], default: "local" },
  social: {
    github: String,
    linkedin: String,
    instagram: String
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
