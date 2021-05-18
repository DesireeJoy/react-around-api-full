const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

// listen to port 3000
const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6084301397633b06c23ceede", // paste the _id of the test user created in the previous step
  };

  next();
});
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.get("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.post("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.delete("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});
app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
});
