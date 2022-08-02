export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._link = data.link
        this._place = data.place
        this._cardSelector = cardSelector
        this._card = this._getTemplate()
        this._handleCardClick = handleCardClick
 
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
            this._handleCardClick(this._place, this._link)
        })
        this._likeBtn.addEventListener('click', () => {
            this._cardLike()
        })
    }
    generateCard() {
        this._cardPlace = this._card.querySelector('.element__title')
        this._cardLink = this._card.querySelector('.element__image')
        this._likeBtn = this._card.querySelector('.element__like')
        this._trashBtn = this._card.querySelector('.element__trash')

        this._setEventListeners()
        this._cardPlace.textContent = this._place
        this._cardLink.src = this._link
        this._cardLink.alt = this._place
        console.log(this._cardPlace)
        return this._card
        
    }
    
}
