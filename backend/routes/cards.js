const express = require("express");
const { celebrate, Joi } = require("celebrate");
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());
const validator = require("validator");

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cardController");

function validateUrl(string) {
  return validator.isURL(string);
}

router.get("/", getCards);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).hex().max(30),
      link: Joi.string().required().custom(validateUrl),
    }),
  }),
  createCard
);

router.put(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }),
  likeCard
);
router.delete(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }),
  dislikeCard
);
router.delete(
  "/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteCard
);

module.exports = router;
