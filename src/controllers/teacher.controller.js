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
  "/teachers",

  async (req, res) => {
    try {
      const teacher = await Teacher.create(req.body);

      return res.send({ teacher });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

module.exports = router;
