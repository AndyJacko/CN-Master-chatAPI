const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.hashPass = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    next();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.tokenCheck = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decodedToken = await jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decodedToken._id);

    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.comparePass = async (req, res, next) => {
  try {
    req.user = await User.findOne({ username: req.body.username });

    if (
      req.user &&
      (await bcrypt.compare(req.body.password, req.user.password))
    ) {
      next();
    } else {
      throw new Error("Incorrect Username or Password");
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
