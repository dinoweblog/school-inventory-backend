require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 12,
  });
};

const register = async (req, res) => {
  try {
   
    let user = await User.findOne({ email: req.body.email }).lean().exec();

  
    if (user)
      return res
        .status(400)
        .send({ message: "User with that email already exists" });

    user = await User.create(req.body);

    
    const token = newToken(user);

  
    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    
    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(400)
        .send({ message: "Either Email or Password is incorrect" });

    const match = user.checkPassword(req.body.password);

    if (!match)
      return res
        .status(400)
        .send({ message: "Either Email or Password is incorrect" });

    const token = newToken(user);
    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const profile = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    const user = {
      name: users.name,
      email: users.email,
      gender: users.gender,
      mobile: users.mobile,
      id: users._id,
      token: users.token,
    };
    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { register, login, profile, newToken };
