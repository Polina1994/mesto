import arkhyz from "../images/altay.jpg"
import chelyabinsk from "../images/baikal.jpg"
import ivanovo from "../images/dombay.jpg"
import kamchatka from "../images/elbrus.jpg"
import kholmogorsk from "../images/kamchatka.jpg"
import baikal from "../images/karachaevo.jpg"

// создание карточек в html
export const initialCards = [
  {
    place: "Архыз",
    link: arkhyz
  },
  {
    place: "Челябинская область",
    link: chelyabinsk,
  },
  {
    place: "Иваново",
    link: ivanovo,
  },
  {
    place: "Камчатка",
    link: kamchatka,
  },
  {
    place: "Холмогорский район",
    link: kholmogorsk,
  },
  {
    place: "Байкал",
    link: baikal,
  },
];

  export const validate = {
    formSelector: '.popup__form',
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
  };
export const userSelectors = {
  name: '.profile__name',
  job: '.profile__job',
  avatar: 'prodile__avatar'
}

export const formAdd = document.querySelector('.form-add')
export const formEdit = document.querySelector('.form-edit')


export const buttonPopupAdd = document.querySelector(".profile__add-button"); //кнопка ред
export const buttonPopupEdit = document.querySelector(".profile__edit-button"); //кнопка добав


export const inputName = document.querySelector(".popup__input_value_name"); //имя в форме
export const inputJob = document.querySelector(".popup__input_value_job"); //профессия в форме
export const inputPlace = document.querySelector(".popup__input_value_place"); //название места карточки в форме
export const inputLink = document.querySelector(".popup__input_value_link"); //картинка карточки в форме
export const popupImage = document.querySelector('.popup-image')

export const  popupOpenImage = document.querySelector('.popup-image__image')
export const popupOpenTitle = document.querySelector('.popup-image__title')
export const addPopup = document.querySelector('.popup-add')
export const editPopup = document.querySelector('.popup-edit')
export const avatarPopup = document.querySelector('popup-avatar')

export const profileName = document.querySelector('.profile__name')
export const profileJob = document.querySelector('.profile__job')