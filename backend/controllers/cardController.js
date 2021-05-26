const Card = require("../models/card");
const {
  NotFoundError,
  InvalidError,
  NoReAuthError,
} = require("../middleware/errorHandling");

function getCards(req, res) {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch();
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Card not found");
      }
      if (card.owner != req.user._id) {
        throw new NoReAuthError("Cards can only be deleted by the card owner");
      }
      return res.status(200).send({ message: "Card Deleted" });
    })
    .catch((err) => {
      if (err.name === "NotFound") {
        throw new NotFoundError("Card not found");
      }
      throw new InvalidError("Invalid data");
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new InvalidError("Invalid card");
      }
    })
    .catch(next);
};
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Card not found" });
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new InvalidError("Invalid card");
      }
      if (err.name === "NotFound") {
        throw new NotFound("Card Not Found");
      }
    })
    .catch(next);
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new NotFoundError("Card not found");
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new InvalidError("Invalid card");
      }
      if (err.name === "NotFound") {
        throw new NotFoundError("Card not found");
      }
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
