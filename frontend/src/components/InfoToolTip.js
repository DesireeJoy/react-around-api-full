import React from "react";

function InfoToolTip(props) {
  return (
    <div
      className={`popup popup__infotooltip ${
        props.isOpen ? "popup_visible" : ""
      }`}
    >
      <div className="popup__toolTip">
        <button
          type="button"
          className="popup__close button"
          aria-label="close"
          onClick={props.onClose}
        ></button>
        <div className="popup__toolTip-container">
          <img
            className="popup__toolTip-image"
            src={props.imageURL}
            alt="success or fail"
          />
          <p className="popup__toolTip-message">{props.message}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoToolTip;
