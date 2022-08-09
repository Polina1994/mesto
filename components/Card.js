export class Card {
    constructor(data, cardSelector, handleCardClick, handleDeleteClick, handleDislikeCard, handleLikeCard, profileId) {
      this._name = data.name;
      this._link = data.link;
      // this._likesCounter = data.likes.length;
      // this._likesCard = data.likes;
      // this._ownerId = data.owner._id;
      this._cardSelector = cardSelector;
      
      this._handleCardClick = handleCardClick;
      // this._handleDeleteClick = handleDeleteClick;
      // this._handleDislikeCard = handleDislikeCard;
      // this._handleLikeCard = handleLikeCard;
      // this._profileId = profileId;
    }
    _getTemplate() {
      const card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      return card;
    }
    generateCard() {
        this._card = this._getTemplate();
        this._cardPlace = this._card.querySelector('.element__title')
        this._cardLink = this._card.querySelector('.element__image')
        this._likeBtn = this._card.querySelector('.element__like')
        this._trashBtn = this._card.querySelector('.element__trash')

        this._setEventListeners()
        this._cardPlace.textContent = this._name
        this._cardLink.src = this._link
        this._cardLink.alt = this._name

        return this._card
      }
      _setEventListeners() {
       
        this._trashBtn.addEventListener('click', () => {
          this._cardDelete()
      })
      this._cardLink.addEventListener('click', () => {
          this._handleCardClick(this._name, this._link)
      })
      this._likeBtn.addEventListener('click', () => {
          this._cardLike()
       })
      }
      // activeLikes(data) {
      //   if (this._hasLiked(data.likes)) {
      //     this._likeButton.classList.add('element__like-active');
      //     this._likeCounter.textContent = data.likes.length;
      //   } 
      // }
      // deactiveLikes(data) {
      //   if (!this._hasLiked(data.likes)) {
      //     this._likeButton.classList.remove('element__like-active');
      //     this._likeCounter.textContent = data.likes.length;
      //   } 
      // }
      deleteCard() {
        this._card.remove()
        this._card = null;
      }
      // _openImgPopup() {
      //   openImageFullscreen(this._name, this._link);
      // }
      // _updateLikeButton() {
      //     if (this._hasLiked(this._likesCard)) {
      //       this._likeButton.classList.add('element__like-active');
      //     }
      //     else {
      //       this._likeButton.classList.remove('element__like-active');
      //     }
      // }
      // _hasLiked(likes) {
      //   return likes.some((item) => item._id == this._profileId);
      // }
    }
    
