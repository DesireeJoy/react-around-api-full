const express = require("express");

const router = express.Router();

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cardController");

router.get("/", getCards);
router.post("/", createCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);
router.delete("/:cardId", deleteCard);

module.exports = router;
