export class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteClick, handleDislikeCard, handleLikeCard, profileId) {
    this._name = data.name;
    this._link = data.link;
    this._likesCounter = data.likes.length;
    this._likesCard = data.likes;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;

    
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleDislikeCard = handleDislikeCard;
    this._handleLikeCard = handleLikeCard;
    this._profileId = profileId;
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
    this._cardImage = this._card.querySelector('.element__image');
    this._likeButton = this._card.querySelector('.element__like');
    this._deleteButton = this._card.querySelector('.element__trash');
    this._likeCounter = this._card.querySelector('.element__count');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCounter.textContent = this._likesCounter
    this._card.querySelector('.element__title').textContent = this._name;

    if (this._ownerId != this._profileId) {
      this._deleteButton.classList.add('element__delete-hide');
    } else {
      this._deleteButton.classList.remove('element__delete-hide');
    }
    this._updateLikeButton();
    return this._card;
  }
  
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('element__like-active')) {
        this._handleDislikeCard();
      } else {
        this._handleLikeCard();
      }
    });
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
    this._cardImage.addEventListener('click', () => this._handleCardClick());
  }

  activeLikes(data) {
    if (this._hasLiked(data.likes)) {
      this._likeButton.classList.add('element__like-active');
      this._likeCounter.textContent = data.likes.length;
    } 
  }

  deactiveLikes(data) {
    if (!this._hasLiked(data.likes)) {
      this._likeButton.classList.remove('element__like-active');
      this._likeCounter.textContent = data.likes.length;
    } 
  }

  deleteCard() {
    this._card.remove()
    this._card = null;
  }

  _openImgPopup() {
    openImageFullscreen(this._name, this._link);
  }

  _updateLikeButton() {
      if (this._hasLiked(this._likesCard)) {
        this._likeButton.classList.add('element__like-active');
      }
      else {
        this._likeButton.classList.remove('element__like-active');
      }
  }

  _hasLiked(likes) {
    return likes.some((item) => item._id == this._profileId);
  }
}

