const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const { requestLogger, errorLogger } = require("./middleware/logger");
const cors = require("cors");
const { celebrate, Joi } = require("celebrate");
const { errors } = require("celebrate");
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
  const { statusCode = 500, message } = err;
  res.send({
    message:
      statusCode === 500 ? "An error occurred on the server" : err.message,
  });
});

app.listen(PORT, () => {
  console.log("Listening at Port:" + PORT);
});
