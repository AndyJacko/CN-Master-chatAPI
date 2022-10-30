const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    if (
      req.body.username.trim() !== "" &&
      req.body.email.trim() !== "" &&
      req.body.password !== ""
    ) {
      const newUser = await User.create(req.body);
      const token = jwt.sign(
        { _id: newUser.id, email: newUser.email },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      res
        .status(201)
        .send({ message: "User Created", user: newUser, token: token });
    } else {
      res.status(200).send({ message: `No User To Create` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.readUser = async (req, res) => {
  try {
    if (req.params.id.length === 24) {
      const readUser = await User.find({ _id: req.params.id });

      if (readUser[0]) {
        res.status(200).send({ user: readUser });
      } else {
        res
          .status(404)
          .send({ message: `No User Found With ID: ${req.params.id}` });
      }
    } else {
      res.status(200).send({ message: `Invalid ID format` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.readUsers = async (req, res) => {
  try {
    const readUsers = await User.find({});

    if (readUsers[0]) {
      res.status(200).send({ users: readUsers });
    } else {
      res.status(404).send({ message: `No Users Found` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.body.id.length === 24) {
      const selectedUser = await User.find({ _id: req.body.id });

      if (selectedUser[0]) {
        const updatedUser = await User.updateOne(
          { _id: req.body.id },
          {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
          }
        );

        if (updatedUser.modifiedCount === 1) {
          const newUser = await User.find({ _id: req.body.id });

          res.status(200).send({
            message: "User Updated",
            user: selectedUser,
            updated: newUser,
          });
        } else {
          res.status(200).send({
            message: `User With ID: ${req.body.id} Already Up To Date`,
          });
        }
      } else {
        res
          .status(404)
          .send({ message: `No User Found With ID: ${req.body.id}` });
      }
    } else {
      res.status(200).send({ message: `Invalid ID format` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.params.id.length === 24) {
      const selectedUser = await User.find({ _id: req.params.id });

      if (selectedUser[0]) {
        const deletedUser = await User.deleteOne({ _id: req.params.id });

        if (deletedUser.deletedCount === 1) {
          res.status(200).send({ message: "User Deleted", user: selectedUser });
        } else {
          res.status(404).send({ message: "User Not Deleted" });
        }
      } else {
        res
          .status(404)
          .send({ message: `No User Found With ID: ${req.params.id}` });
      }
    } else {
      res.status(200).send({ message: `Invalid ID format` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const token = jwt.sign(
      { _id: req.user._id, email: req.user.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      message: `User Logged In`,
      user: req.user._id,
      token: token,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
