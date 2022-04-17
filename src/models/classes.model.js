const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    grade: { type: String, required: true },
    section: { type: Number, required: true },
    subject: [{ type: String, required: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("class", classSchema);
