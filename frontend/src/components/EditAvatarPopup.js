import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarModal(props) {
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Edit Avatar"
      buttonText="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form_input popup__input form__input_type_avatar-link"
        id="avatar-input"
        type="url"
        name="link"
        placeholder="avatar"
        ref={avatarRef}
        required
      />
      <span
        className="popup__form_input_type_error avatar-input-error error"
        name="inputFile-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarModal;
