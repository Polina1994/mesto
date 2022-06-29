import { popupOpenImage, popupOpenTitle, openPopup, popupImage } from './index.js';

export class Card {
    constructor(data, cardSelector) {
        this._link = data.link
        this._name = data.name
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
        this._element = this._getTemplate();
        this._setEventListeners()
        this._element.querySelector('.element__title').textContent = this._name
        this._element.querySelector('.element__image').src = this._link
        this._element.querySelector('.element__like').src = this._like
        this._element.querySelector('.element__trash').src = this._trash

        return this._element
    }
    _buttonLike() {
        this._element.querySelector('.element__like').classList.toggle('element__like-active')
    }
    _buttonDelete() {
        this._element.querySelector('.element__trash').closest('.element').remove()
    }
    
    _openImage() {
        popupOpenImage.src = this._link
        popupOpenTitle.alt = this._name
        popupOpenTitle.textContent = this._name
        openPopup(popupImage)
    }

    _setEventListeners() {
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._buttonDelete()
          })
          this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openImage()
          })
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._buttonLike()
          })
    }
}
items.forEach((item) => {
    const card = new Card(item, '.card')
    const cardElement = card.generateCard()

    document.querySelector('.elements').append(cardElement)
});