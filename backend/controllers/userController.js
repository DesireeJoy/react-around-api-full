const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  NotFoundError,
  InvalidError,
  AuthError,
  MongoError,
} = require("../middleware/errorHandling");

const { NODE_ENV, JWT_SECRET } = process.env;

function getUsers(req, res) {
  return User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch();
}

function getOneUser(req, res) {
  e;
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFound("User Not Found");
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new InvalidError("Invalid user");
      }
      if (err.name === "NotFound") {
        throw new NotFound("User Not Found");
      }
    });
}

function getCurrentUser(req, res, next) {
  return User.findById(req.user._id)
    .then((user) => {
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
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
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
// function createUser(req, res, next) {
//   const { name, about, avatar, email, password } = req.body;
//   bcrypt
//     .hash(password, 10)
//     .then((hash) =>
//       User.create({
//         name,
//         about,
//         avatar,
//         email,
//         password: hash,
//       })
//     )
//     .then((user) =>
//       res
//         .send({
//           name: user.name,
//           about: user.about,
//           avatar: user.avatar,
//           email: user.email,
//         }))
//         .catch((err) => {
//       if (err.code === 11000 && err.name === "MongoError") {
//         throw  MongoError("Duplicate email");
//       }
//       if (err.name === "ValidationError") {
//         throw new InvalidError("Invalid user");
//       }
//       if (err.name === "NotFound") {
//         throw new NotFoundError("User not found");
//       })
//     .catch(next);
// }

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
        throw new NotFoundError("User not found");
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (req.body === null) {
        throw new InvalidError("Empty request");
      }
      if (err.name === "ValidationError") {
        throw new InvalidError("Invalid user");
      }
      if (err.name === "CastError") {
        throw new InvalidError("Invalid user");
      }
      if (err.name === "NotFound") {
        throw new NotFoundError("User not found");
      }
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .select("password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new InvalidError("Incorrect password or email"));
      }

      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return Promise.reject(
            new InvalidError("Incorrect password or email")
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
        throw new NotFoundError("User not found");
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (req.body === null) {
        throw new InvalidError("Empty request");
      }
      if (err.name === "CastError") {
        throw new InvalidError("Invalid user");
      }
      if (err.name === "NotFound") {
        throw new NotFoundError("User not found");
      }
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
