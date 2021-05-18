import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_visible" : ""}`}>
      <div className="popup__form">
        <form
          className={`popup__${props.name}_form-selector form`}
          noValidate
          onSubmit={props.onSubmit}
        >
          <h3 className="popup__card_heading">{props.title}</h3>
          {props.children}

          <button
            type="submit"
            className="form__submit popup__submit "
            value="Save"
            disabled=""
          >
            {props.buttonText}
          </button>
          <button
            type="button"
            className="popup__close button"
            aria-label="close"
            onClick={props.onClose}
          ></button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
