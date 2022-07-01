import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js';
import { items, validate } from './constants.js'




// const popupList = Array.from(document.querySelectorAll(".popup"));

const popupEdit = document.querySelector(".popup-edit"); //попап редактирования
const popupAdd = document.querySelector(".popup-add"); //попап добавления
const popup = document.querySelector(".popup"); //попап
const popupForm = popup.querySelector(".popup__form"); //попап форма
const formAdd =document.querySelector('.form-add')
const formTitle = popup.querySelector('.popup__input_value_place')
const formLink = popup.querySelector('.popup__input_value_link')
const formEdit = document.querySelector('.form-edit')

const popupImage = document.querySelector(".popup-image");

const buttonPopupAdd = document.querySelector(".profile__add-button"); //кнопка ред
const buttonPopupEdit = document.querySelector(".profile__edit-button"); //кнопка добав
const buttonCloseEditPopup = document.querySelector(".popup-edit__close-button"); //кнопка закрытия
const buttonCloseAddPopup = document.querySelector(".popup-add__close-button"); //кнопка закрытия
const buttonCloseImagePopup = document.querySelector(".popup-image__close-button");
const buttonsOpenPopup = document.querySelector(".open-popup"); //кнопка открытия

const profileName = document.querySelector(".profile__name"); //имя
const profileJob = document.querySelector(".profile__job"); //профессия
const elementPlace = document.querySelector(".element__title"); // имя карточки
const elementLink = document.querySelector(".element__link"); // линк карточки

const inputName = document.querySelector(".popup__input_value_name"); //имя в форме
const inputJob = document.querySelector(".popup__input_value_job"); //профессия в форме
const inputPlace = document.querySelector(".popup__input_value_place"); //название места карточки в форме
const inputLink = document.querySelector(".popup__input_value_link"); //картинка карточки в форме

const cardList = document.querySelector(".elements"); //карточки
const elementTemplate = document.getElementById("element-template").content;

const popupOpenImage = document.querySelector(".popup-image__image");
const popupOpenTitle = document.querySelector(".popup-image__title");

const editFormValid = new FormValidator(validate, formEdit)
const addFormValid = new FormValidator(validate, formAdd)
//открытие попапа

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", popupCloseEscButton);
}

//открытие попапа добавления

buttonPopupAdd.addEventListener("click", function () {
  openPopup(popupAdd);
});

//открытие попапа редактирования

buttonPopupEdit.addEventListener("click", function () {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupEdit);
});

// закрытие попапа

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", popupCloseEscButton);
}

//закрытие нажатием на esc

function popupCloseEscButton(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_is-opened");
    closePopup(popupOpened);
  }
}

//закрытие кликом

function popupClickClose(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

document.querySelectorAll(".popup__close-button").forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

//закрытие нажатием за пределы попапа

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", popupClickClose);
});

//сохранение информации
function handleEditCardSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
  editFormValid.toggleButtonState()
}
popupForm.addEventListener("submit", handleEditCardSubmit);

//создание новой карточки
// const addCard = (card) => {
//   cardList.prepend(card);
// };

//добавление новой карточки

// function handleAddCardSubmit(evt) {
//   evt.preventDefault();
//   const name = inputPlace.value;
//   const link = inputLink.value;
//   createCard(name, link);
  
//   closePopup(popupAdd);
//   enableValidation(validate)
//   evt.target.reset();
// }
// popupAdd.addEventListener("submit", handleAddCardSubmit);


//карточка
// const createCard = ({ link, name }) => {
//   const placeElement = elementTemplate
//     .querySelector(".element")
//     .cloneNode(true);

//   placeElement.querySelector(".element__title").textContent = name;
//   const image = placeElement.querySelector(".element__image");

//   image.src = link;
//   image.alt = name;

//   placeElement
//     .querySelector(".element__like")
//     .addEventListener("click", function (evt) {
//       evt.target.classList.toggle("element__like-active"); //лайк
//     });

//   placeElement
//     .querySelector(".element__trash")
//     .addEventListener("click", function (evt) {
//       evt.target.closest(".element").remove(); //удаление карточки
//     });

//   const cardImage = placeElement.querySelector(".element__image");

//   cardImage.addEventListener("click", () => {
//     popupOpenImage.src = link;
//     popupOpenTitle.alt = name;
//     popupOpenTitle.textContent = name;
//     openPopup(popupImage);
//   });

//   return placeElement;
// };

// function createCard(name, link) {
//   const cardElement = new Card(name, link, '.card')
//   const newCard = cardElement.generateCard()
  
//   cardList.prepend(newCard)
// }

function openImage(name, link) {
  openPopup(popupImage)
  popupOpenImage.src = link
  popupOpenImage.alt = name
  popupOpenTitle.textContent = name
}

function handleAddCardSubmit(evt) {
  evt.preventDefault()
  const card = {}
  card.name = inputPlace.value
  card.link = inputLink.value
  createCard(card)
  evt.target.reset()
  closePopup(popupAdd)
  addFormValid.toggleButtonState()

}
popupAdd.addEventListener("submit", handleAddCardSubmit);
function newCard(data) {
  const cards = new Card(data, '.card', openImage)
  return cards.generateCard()
}

function createCard(card) {
  cardList.prepend(newCard(card))
}
items.forEach(createCard)

editFormValid.enableValidation()
addFormValid.enableValidation()