import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteConfirmPopup(props) {
  return (
    <PopupWithForm
      name={props.name}
      title={props.title}
      buttonText={props.buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={props.onSubmit}
    ></PopupWithForm>
  );
}

export default DeleteConfirmPopup;
