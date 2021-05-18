import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import api from "../utils/api";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <Header
        link={"/signin"}
        text={"Log out"}
        userEmail={props.userEmail}
        handleSignOut={props.handleSignOut}
      />
      {/* Profile Section */}
      <section className="profile">
        <form className="profile__info-area">
          <button
            className="profile__avatar-edit"
            aria-label="edit-avatar"
            type="button"
            onClick={props.handleEditAvatarClick}
          />
          <img
            id="avatar Image"
            alt="Avatar Image for User"
            className="profile__avatar"
            src={currentUser.avatar}
          />
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__title">{currentUser.about}</p>
          </div>
          <button
            className="profile__editbtn button"
            aria-label="Edit"
            type="button"
            name="edit_btn"
            onClick={props.handleEditProfileClick}
          />
        </form>
        <button
          aria-label="add"
          className="profile__addbtn button"
          type="button"
          name="add_btn"
          onClick={props.handleAddPlaceClick}
        />
      </section>
      {/* Grid Section */}
      <section className="grid">
        <ul className="grid__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              _id={card._id}
              src={card.link}
              title={card.name}
              likes={card.likes}
              owner={card.owner}
              onCardLike={() => {
                props.onCardLike(card);
              }}
              handleCardClick={() => {
                props.handleCardClick(card);
              }}
              handleDeleteClick={() => {
                props.onCardDeleteClick(card);
              }}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
