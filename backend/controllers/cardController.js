const Card = require("../models/card");

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
        return res.status(404).send({ message: "Card Not Found" });
      }
      return res.status(200).send({ message: "Card Deleted" });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(500).send({ message: "Internal Server Error" });
      }
      return res.status(400).send({ message: "invalid Data" });
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
        return res.status(400).send({ message: "Invalid data" });
      }
      return res.status(500).send({ message: "Error" });
    });
};
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Card not found" });
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid card" });
      }
      if (err.name === "NotFound") {
        return res.status(404).send({ message: "Card not found" });
      }
      return res.status(500).send({ message: "Error" });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      return res.status(404).send({ message: "Card not found to dislike" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(400)
          .send({ message: "This is not the card you are looking for" });
      }
      return res.status(500).send({ message: "Internal Server Error" });
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
