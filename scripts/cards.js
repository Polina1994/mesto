// создание карточек в html

const items = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];
const popup = document.querySelector(".popup-image"); 
const popupOpenImage = document.querySelector(".popup-image__image");
const popupOpenTitle = document.querySelector(".popup-image__title");
const buttonCloseImagePopup = document.querySelector(".popup-image__close-button");
const cardImage = document.querySelector(".element__image");
const popupImage = document.querySelector(".popup-image");

  class Card {
    constructor(data, cardSelector) {
        this._name = data.name
        this._link = data.link
        this._like = data.like
        this._trash = data.trash
        this._cardSelector = cardSelector
    }
  
    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)
  
      return cardElement
    }
    generateCard() {
      this._element = this._getTemplate()
      this._setEventListeners()
      this._element.querySelector('.element__image').src = this._link
      this._element.querySelector('.element__trash').src = this._trash
      this._element.querySelector('.element__title').textContent = this._name
      this._element.querySelector('.element__like').src = this._like
      return this._element
    }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._cardLike()
    })
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._deleteCard()
    })
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openImagePopup()
    })
  }

    _cardLike() {
      this._element.querySelector('.element__like').classList.toggle('element__like-active') 
    }

    _deleteCard() {
      this._element.querySelector('.element__trash').closest('.element').remove()
    }

    _openImagePopup() {
      popupOpenImage.src = this._link;
      popupOpenTitle.alt = this._name;
      popupOpenTitle.textContent = this._name;
      openPopup(popupImage);
    }
  }
  items.forEach((item) => {
    const card = new Card(item, '.card')
    const cardElement = card.generateCard()

    document.querySelector('.elements').append(cardElement)
  }
  )

