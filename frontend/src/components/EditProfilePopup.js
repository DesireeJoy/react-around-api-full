import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  function handleName(e) {
    setName(e.target.value);
  }
  function handleAbout(e) {
    setAbout(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: about,
    });
  }

  // Subscription to the context
  const currentUser = React.useContext(CurrentUserContext);

  // After loading the current user from the API
  // their data will be used in managed components.
  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Edit Profile"
      buttonText="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input form_input"
        id="inputName"
        value={name || ""}
        name="profileName"
        minLength={2}
        maxLength={40}
        onChange={handleName}
        required
      />
      <span
        className="popup__form_input_type_active inputName-error error"
        name="inputName-error"
      />
      <input
        type="text"
        className="popup__input form_input"
        id="inputTitle"
        value={about || ""}
        name="profileTitle"
        minLength={2}
        maxLength={200}
        onChange={handleAbout}
        required
      />
      <span
        className="popup__form_input_type_active inputTitle-error error"
        name="inputTitle-error"
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
