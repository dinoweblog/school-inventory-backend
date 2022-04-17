const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    image_urls: [{ type: String, required: true }],
    classes: [{ type: Schema.Types.ObjectId, ref: "class" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("teacher", teacherSchema);
