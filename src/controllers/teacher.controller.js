const express = require("express");

const Teacher = require("../models/teacher.model");

const { uploadSingle, uploadMultiple } = require("../middlewares/upload");

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const teachers = await Teacher.find().lean().exec();

    return res.send(teachers);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post(
  "/single",
  authenticate,
  authorise(["seller", "admin"]),
  uploadSingle("image_urls"),
  async (req, res) => {
    try {
      const teacher = await Teacher.create({
        name: req.body.name,
        price: req.body.price,
        image_urls: req.file.path,
      });

      return res.send({ teacher });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.post(
  "/multiple",
  authenticate,
  authorise(["seller", "admin"]),
  uploadMultiple(2, "image_urls"),
  async (req, res) => {
    try {
      const filePaths = req.files.map((file) => file.path);

      const teacher = await Teacher.create({
        name: req.body.name,
        price: req.body.price,
        image_urls: filePaths,
      });

      return res.send({ teacher });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

module.exports = router;
