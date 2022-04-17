const Class = require("../models/classes.model");

const classes = async (req, res) => {
  try {
    const classes = await Class.create(req.body);

    return res.status(201).send(classes);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { classes };
