// import { popupOpenImage, popupOpenTitle, openPopup, popupImage } from './index.js';
// import { items } from './constants.js';

export class Card {
    constructor(data, cardSelector, openImage) {
        this._link = data.link
        this._name = data.name
        this._cardSelector = cardSelector
        this._card = this._getTemplate()

        this._cardName = this._card.querySelector('.element__title')
        this._cardLink = this._card.querySelector('.element__image')
        this._likeBtn = this._card.querySelector('.element__like')
        this._trashBtn = this._card.querySelector('.element__trash')

        this._openImage = openImage
    }
    _getTemplate() {
        const card = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true)

        return card
    }

    _cardLike() {
        this._likeBtn.classList.toggle('element__like-active')
    }
    _cardDelete() {
        this._trashBtn.closest('.element').remove()
    }
    _setEventListeners() {
        this._trashBtn.addEventListener('click', () => {
            this._cardDelete()
        })

        this._cardLink.addEventListener('click', () => {
            this._openImage(this._name, this._link)
        })

        this._likeBtn.addEventListener('click', () => {
            this._cardLike()
        })
    }
    generateCard() {
        
        this._cardName.textContent = this._name
        this._cardLink.src = this._link
        this._cardLink.alt = this._name
        this._setEventListeners()
        return this._card
    }
     
}
