import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup__image popup ${props.isOpen ? "popup_visible" : ""}`}
    >
      <div className="popup__image_cont">
        <div className="popup__image_wrap">
          <img
            className="grid__image_active"
            src={props.selectedCard.link}
            alt={props.selectedCard.name}
          />
          <button
            type="button"
            className="popup__close button"
            aria-label="close"
            onClick={props.onClose}
          ></button>
        </div>
        <div className="popup__image_capt">{props.selectedCard.name}</div>
      </div>
    </div>
  );
}

export default ImagePopup;
