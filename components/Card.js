export class Card {
    constructor(data, cardSelector, handleCardClick, { handleDeleteClick, handleLikeCard, handleDislikeCard}, userId) {
      this._data = data
      this._name = data.name;
      this._link = data.link;
      this._owner = data.owner._id;
      this._id = data._id
      this._likes = data.likes;

      this.cardId = data._id
      this.userId = userId
      this._cardSelector = cardSelector;

      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
      this._handleLikeCard = handleLikeCard
      this._handleDislikeCard = handleDislikeCard
      this._ownerId = this.userId === this._owner
    }

    _getTemplate() {
      const card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      return card;
    }
    getId() {
        return this._id
    }

      _setEventListeners() {
      this._trashBtn.addEventListener('click', () => 
          this._handleDeleteClick()
      )

      this._cardLink.addEventListener('click', () => {
          this._handleCardClick(this._name, this._link)
      })

      this._likeBtn.addEventListener('click', () => {
        if (this._likeBtn.classList.contains('element__like-active')) {
          this.dislikeCard()
          this._handleDislikeCard()
        } else {
          this.likeCard()
          this._handleLikeCard()
        }
      })
    }
 
  _checkLikes() {
    this._likes.forEach(like => {
      if(like._id === this.userId) {
        this._likeBtn.classList.add('element__like-active')
      }
    })
  }

  likeCard() {
    this._likeBtn.classList.add('element__like-active')
  }

  dislikeCard() {
    this._likeBtn.classList.remove('element__like-active')
  }

  renewLikes(data) {
    this._likesCounter.textContent = data.likes.length
  }

    _checkCardOwner() {
      if (!this._owner) {
        this._trashBtn.remove()
        return this._card
      }
    }
    
    deleteCard() {
      this._card.remove()
      this._card = null
    }
   
    generateCard() {
      this._card = this._getTemplate();
     
      this._cardPlace = this._card.querySelector('.element__title')
      this._cardLink = this._card.querySelector('.element__image')
      this._likeBtn = this._card.querySelector('.element__like')
      this._trashBtn = this._card.querySelector('.element__trash')
      this._likesCounter = this._card.querySelector('.element__count')
      this._setEventListeners()
      this._cardPlace.textContent = this._name
      this._cardLink.src = this._link
      this._cardLink.alt = this._name

      this._checkCardOwner()
      this.renewLikes(this._data)
      this._checkLikes()
      return this._card
    }
}
    
