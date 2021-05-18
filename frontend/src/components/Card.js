import logo from "../images/Logo.svg";
import React, { useState, useEffect, createContext } from "react";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Checking if you are the owner of the current card
  const isOwn = props.card.owner._id === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = `button ${
    isOwn ? "grid__btn_del" : "grid__btn_del_hidden"
  }`;

  // Check if the card was liked by the current user
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = `button grid__heart ${
    isLiked ? "grid__heart_active" : ""
  }`;

  return (
    <li className="grid__card">
      <button
        className={cardDeleteButtonClassName}
        onClick={() => {
          props.handleDeleteClick(props.card);
        }}
      ></button>

      <button
        className="grid__btn_popup"
        type="button"
        aria-label="view image"
        onClick={() => {
          props.handleCardClick(props.card);
        }}
      >
        <img className="grid__image" src={props.src} alt={props.title} />
      </button>
      <div className="grid__card-text">
        <h2 className="grid__caption">{props.title}</h2>
        <div className="grid__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="like"
            onClick={() => {
              props.onCardLike(props.card);
            }}
          ></button>
          <p className="grid__like-count">{props.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
