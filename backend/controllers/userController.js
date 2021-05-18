const User = require("../models/user");

function getUsers(req, res) {
  return User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch();
}

function getOneUser(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User ID not found" });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid user" });
      }
      if (err.name === "NotFound") {
        return res.status(404).send({ message: "User not found" });
      }
      return res.status(500).send({ message: "Error" });
    });
}

function createUser(req, res) {
  const { name, about, avatar, email, password } = req.body;
  return User.create({ name, about, avatar, email, password })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send(err.message);
      }
      return res.status(500).send({ message: "Internal Server Error" });
    });
}
function updateUser(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(400)
          .send({ message: "This is not the card you are looking for" });
      }
      return res.status(500).send({ message: "Internal Server Error" });
    });
}
function updateAvatar(req, res) {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.params.id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(400)
          .send({ message: "This is not the card you are looking for" });
      }
      return res.status(500).send({ message: "Internal Server Error" });
    });
}

module.exports = {
  getOneUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
};
