const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https|http?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(
          v
        );
      },
      message: "Invalid link",
    },
    default: 'link:',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v){
      return validator.isEmail(v);
    }
    message: 'Invalid email',
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,

  },
});
module.exports = mongoose.model("user", userSchema);
