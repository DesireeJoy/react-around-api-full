const router = require("express").Router(); 
const { celebrate, Joi } = require("celebrate"); 
const { auth } = require("../middleware/auth"); 
const validator = require("validator"); 
 
function validateUrl(string) { 
  return validator.isURL(string); 
} 
 
// const path = require("path"); 
// const fs = require("fs").promises; 
 
// const dataPath = path.join(__dirname, "../data/users.json"); 
// joining the path segments to create an absolute path 
 
// router.get("/", (req, res) => { 
//   fs.readFile(dataPath, { encoding: "utf8" }) 
//     .then((data) => { 
//       res.status(200).send(JSON.parse(data)); 
//     }) 
//     .catch(() => { 
//       res.status(500).send({ message: "File not found" }); 
//     }); 
// }); 
 
// router.get("/:id", (req, res) => { 
//   fs.readFile(dataPath, { encoding: "utf8" }) 
//     .then((data) => { 
//       const newData = JSON.parse(data); 
//       const selectedUser = newData.find((user) => user._id === req.params.id); 
//       if (!selectedUser) { 
//         res.status(404).send({ message: "User ID not found" }); 
//       } else { 
//         res.send({ selectedUser }); 
//       } 
//     }) 
//     .catch((err) => { 
//       res.statut(500).send({ message: "File not found" }); 
//     }); 
// }); 
 
// module.exports = router; 
const { 
  getOneUser, 
  getUsers, 
  // createUser, 
  updateAvatar, 
  updateUser, 
} = require("../controllers/userController"); 
 
router.get("/", getUsers); 
// router.post("/", createUser); 
router.get( 
  "/:userId", 
  auth, 
  celebrate({ 
    params: Joi.object().keys({ 
      userId: Joi.string().hex().length(24).required(), 
    }), 
  }), 
  getOneUser 
); 
 
router.get("/me, getCurrentUser"); 
router.patch( 
  "/me/avatar", 
  auth, 
  celebrate({ 
    body: Joi.object().keys({ 
      avatar: Joi.string().custom(validateUrl).required().min(2).max(30), 
    }), 
  }), 
  updateAvatar 
); 
router.patch( 
  "/me", 
  auth, 
  celebrate({ 
    body: Joi.object().keys({ 
      name: Joi.string().required().min(2).hex().max(30), 
      about: Joi.string().custom(validateUrl).required().min(2).max(30), 
    }), 
  }), 
  updateUser 
); 
 
module.exports = router; 
 
json
.eslintrc.json
NO COMMENTS
md
README.md
NO COMMENTS
js
app.js
NO COMMENTS
const express = require("express"); 
 
const mongoose = require("mongoose"); 
const bodyParser = require("body-parser"); 
const helmet = require("helmet"); 
const rateLimit = require("express-rate-limit"); 
 
 
const cors = require("cors"); 
const { celebrate, Joi } = require("celebrate"); 
 
const { errors } = require("celebrate"); 
const { requestLogger, errorLogger } = require("./middleware/logger"); 
const { NotFoundError } = require("./middleware/errorHandling"); 
 
 
const limiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, // 15 minutes 
  max: 100, // limit each IP to 100 requests per window 
}); 
 
mongoose.connect("mongodb://localhost:27017/aroundb", { 
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useFindAndModify: false, 
  useUnifiedTopology: true, 
}); 
 
const usersRouter = require("./routes/users"); 
const cardsRouter = require("./routes/cards"); 
 
const { 
  login, 
  createUser, 
  getCurrentUser, 
} = require("./controllers/userController"); 
const { auth } = require("./middleware/auth"); 
 
// listen to port 3000 
const { PORT = 3000 } = process.env; 
require("dotenv").config(); 
 
const app = express(); 
 
app.use(cors()); 
app.options("*", cors()); 
app.use(requestLogger); 
app.use(limiter); 
app.use(bodyParser.json()); 
 
app.use(requestLogger); 
 
app.post( 
  "/signin", 
  celebrate({ 
    body: Joi.object() 
      .keys({ 
        email: Joi.string().required().email(), 
        password: Joi.string().required().min(8), 
      }) 
      .unknown(true), 
  }), 
  login 
); 
 
app.post( 
  "/signup", 
  celebrate({ 
    body: Joi.object() 
      .keys({ 
        email: Joi.string().required().email(), 
        password: Joi.string().required().min(8), 
      }) 
      .unknown(true), 
  }), 
  createUser 
); 
app.get("/users/me", auth, getCurrentUser); 
app.use("/users", auth, usersRouter); 
app.use("/cards", auth, cardsRouter); 
 
app.get("/crash-test", () => { 
  setTimeout(() => { 
    throw new Error("Server will crash now"); 
  }, 0); 
}); 
 
app.use("*", (err) => { 
  if (err.name === "NotFound") { 
    throw new NotFoundError("Requested resource not found"); 
  } 
}); 
 
app.use(errorLogger); // enabling the error logger 
app.use(helmet()); 
app.use(errors()); 
 
app.use((err, req, res, next) => { 
  res.status(err.statusCode).send({ 
    message: err.statusCode === 500 ? "Error from server" : err.message, 
  }); 
  next(); 
}); 
 
app.listen(PORT, () => { 
  console.log("Listening at Port:" + PORT); 
}); 