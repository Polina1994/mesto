import arkhyz from "../images/altay.jpg"
import chelyabinsk from "../images/baikal.jpg"
import ivanovo from "../images/dombay.jpg"
import kamchatka from "../images/elbrus.jpg"
import kholmogorsk from "../images/kamchatka.jpg"
import baikal from "../images/karachaevo.jpg"

// создание карточек в html
export const items = [
  {
    name: "Архыз",
    link: arkhyz
  },
  {
    name: "Челябинская область",
    link: chelyabinsk,
  },
  {
    name: "Иваново",
    link: ivanovo,
  },
  {
    name: "Камчатка",
    link: kamchatka,
  },
  {
    name: "Холмогорский район",
    link: kholmogorsk,
  },
  {
    name: "Байкал",
    link: baikal,
  },
];

  export const validate = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
  };