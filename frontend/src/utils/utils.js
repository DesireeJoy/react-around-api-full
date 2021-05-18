export const openPopUp = (popUpSelect) => {
  popUpSelect.classList.add("popup_visible");
  document.addEventListener("keyup", closeWithEsc);
};

export const ESC_KEYCODE = 27;

export const closeWithEsc = (evt) => {
  if (evt.which === ESC_KEYCODE) {
    closePopUp();
  }
};

export const closePopUp = () => {
  const findCurrent = document.querySelector(".popup_visible");
  findCurrent.classList.remove("popup_visible");
  document.removeEventListener("keyup", closeWithEsc, false);
};
