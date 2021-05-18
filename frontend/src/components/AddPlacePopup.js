import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [cardLink, setCardLink] = React.useState("");
  const [cardName, setCardName] = React.useState("");

  function handleCardLink(e) {
    setCardLink(e.target.value);
  }
  function handleCardName(e) {
    setCardName(e.target.value);
  }
  function handleAddCard(e) {
    e.preventDefault();
    props.onAddPlace({
      name: cardName,
      link: cardLink,
    });
    setCardLink("");
    setCardName("");
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddCard}
      name="card"
      title="New Place"
      buttonText="Save"
    >
      <input
        type="text"
        className="popup__card_input form_input"
        id="inputPlace"
        name="placeName"
        placeholder="Title"
        onChange={handleCardName}
        value={cardName}
        minLength={2}
        maxLength={30}
      />
      <span
        className="popup__form_input_type_active inputPlace-error error"
        name="inputPlace-error"
      />
      <input
        type="url"
        className="popup__card_input form_input"
        id="inputFile"
        name="placeFileName"
        onChange={handleCardLink}
        value={cardLink}
        placeholder="Link"
      />
      <span
        className="popup__form_input_type_active inputFile-error error"
        name="inputFile-error"
      />
    </PopupWithForm>
  );
}
export default AddPlacePopup;
