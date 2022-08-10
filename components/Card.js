export class Card {
    constructor(data, cardSelector, handleCardClick, { handleDeleteClick, handleLikeCard, handleDislikeCard}, myId) {
      this._data = data
      this._name = data.name;
      this._link = data.link;
      this._owner = data.owner._id;
      this._id = data._id
      this._likes = data.likes;
      this._likesCounter = data.likes.length

      this._cardId = data._id
      this._handleLikeCard = handleLikeCard
      this._handleDislikeCard = handleDislikeCard
      this._myId = myId
      
      this._cardSelector = cardSelector;
      
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
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
    generateCard() {
        this._card = this._getTemplate();
       
        this._cardPlace = this._card.querySelector('.element__title')
        this._cardLink = this._card.querySelector('.element__image')
        this._likeBtn = this._card.querySelector('.element__like')
        this._trashBtn = this._card.querySelector('.element__trash')
        this._likeCounter = this._card.querySelector('.element__count')
        this._setEventListeners()
        this._cardPlace.textContent = this._name
        this._cardLink.src = this._link
        this._cardLink.alt = this._name

        this._likeCounter.textContent = this._likesCounter
        return this._card
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
          this.cardDislike()
        } else {
          this.cardLike()
        }
       })
    }
    
    cardLike() {
      this._likeBtn.classList.add('element__like-active')
      }

    cardDislike() {
      this._likeBtn.classList.remove('.elememt__like-active')
      }
  
    
    deleteCard() {
      this._card.remove()
      this._card = null
    }
   
}
    
