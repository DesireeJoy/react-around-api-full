const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  NotFoundError,
  InvalidError,
  AuthError,
  MongoError,
} = require("../middleware/errorHandling");

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

function getCurrentUser(req, res, next) {
  console.log("user", req.user);
  return User.findById(req.user._id)
    .then((user) => {
      //console.log(user);
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError("User not found");
    })
    .catch(next);
}

function createUser(req, res, next) {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res
        .send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        })
        .then((data) => {
          console.log("THis data in userController is " + data);
        })
    )
    .catch((err) => {
      if (err.code === 11000 && err.name === "MongoError") {
        throw new MongoError("Duplicate email");
      }
      if (err.name === "ValidationError") {
        throw new InvalidError("Invalid user");
      }
      if (err.name === "NotFound") {
        throw new NotFoundError("User not found");
      }
    })
    .catch(next);
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

function login(req, res, next) {
  const { email, password } = req.body;
  console.log(req.body);
  User.findOne(req.body)
    .select("password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new InvalidError("Incorrect password or email"));
      }
      console.log(user);
      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return Promise.reject(
            new InvalidError("BIncorrect password or email")
          );
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          { expiresIn: "7d" }
        );

        res.send({ token });
      });
    })
    .catch((err) => {
      console.log(err);
      throw new AuthError("Authorization Error");
    })
    .catch(next);
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
  getCurrentUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
