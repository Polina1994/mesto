import '../pages/index.css';
import {Section} from '../components/Section.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupConfirm} from '../components/PopupConfirm.js';
import {UserInfo} from '../components/UserInfo.js';
import { initialCards } from '../utils/constants';
import {api} from '../components/Api.js'
import { css } from 'jquery';
const editPopup = document.querySelector('.popup-edit');
const nameInput = editPopup.querySelector('.popup__input_value_name');
const jobInput = editPopup.querySelector('.popup__input_value_job');
const addPopup = document.querySelector('.popup-add');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const avatarPopup = document.querySelector('.popup-avatar');
const buttonOpenAvatarPopup = document.querySelector('.profile__avatar-overlay');

const validate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};



const editValid = new FormValidator(validate, editPopup);
editValid.enableValidation();

const addValid = new FormValidator(validate, addPopup);
addValid.enableValidation();

const avatarValidator = new FormValidator(validate, avatarPopup);
avatarValidator.enableValidation();

const popupWithImage = new PopupWithImage('.popup-image');
popupWithImage.setEventListeners();

const popupProfile = new PopupWithForm('.popup-edit', editProfileInfo);
popupProfile.setEventListeners();

const popupCard = new PopupWithForm('.popup-add', addNewCard);
popupCard.setEventListeners();

const popupConfirm = new PopupConfirm('.popup-confirm');
popupConfirm.setEventListeners();

const popupAvatar = new PopupWithForm('.popup-avatar', setNewAvatar);
popupAvatar.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__job',
  profileAvatar: '.profile__avatar',
});

const cardList = new Section({
    renderer: createCard
}, '.elements');


Promise.all([                 
  api.getUserData(), 
  api.getCards() 
]) 
.then(([result, initialCards]) => {
  userInfo.setUserInfo({name: result.name, about: result.about, profileId: result._id, profileAvatar: result.avatar});
  cardList.renderSection(initialCards);
})
.catch((err)=>{              
  console.log(err);
})

function createCard(data) {
  const cards = new Card(data,'.card', {
    handleCardClick: popupWithImage.open,
    handleDeleteClick: openPopupConfirm.open,
    profileId: userInfo.getUserInfo().profileId,
    handleDislikeCard: () => dislikeCard(),
    handleLikeCard: () => likeCard()
  });
  return cards.generateCard();
}


function openPopupConfirm(id, card) {
  popupConfirm.open();
      popupConfirm.setSubmitCallback(() => {
        api.deleteCard(id)
          .then(() => {
            card.deleteCard();
            popupConfirm.close();
          })
          .catch((err) => {
            console.error(err); 
          });
      });
}

function dislikeCard(id, card) {
  api.dislikeCard(id)
    .then((result) => {
      card.deactiveLikes(result);
    })
    .catch((err) => {
      console.error(err); 
    });
}

function likeCard(id, card) {
  api.likeCard(id)
    .then((result) => {
      console.log(result);
      card.activeLikes(result);
    })
    .catch((err) => {
      console.error(err); 
    });
}

function openPropfilePopup() {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.about;
  popupProfile.open();
}

function editProfileInfo(data) {
  popupProfile.setLoadingState(true);
  console.log(data.about)
  api.setUserData({name: data.name, about: data.about})

    .then((res) => {
      userInfo.setUserInfo({name: res.name, about: res.about, profileId: res._id, profileAvatar: res.avatar});
      popupProfile.close();
    })
    .catch((err) => {
      console.error(err); 
    })
    .finally(() => popupProfile.setLoadingState(false));
}

function addNewCard(result) {
  popupCard.setLoadingState(true);
  api.addNewCard(result)
  .then((data) => {
    createCard.addItem(data);
    popupCard.close();
  })
  .catch((err) => {
    console.error(err); 
  })
  .finally(() => popupCard.setLoadingState(false));
}


function setNewAvatar(data) 
{
  popupAvatar.setLoadingState(true);
  api.setNewAvatar({avatar: data.avatar})
    .then((res) => {
      userInfo.setUserInfo({name: res.name, about: res.about, profileId: res._id, profileAvatar: res.avatar});
      popupAvatar.close();
    })
    .catch((err) => {
      console.error(err); 
    })
    .finally(() => popupAvatar.setLoadingState(false));
}

buttonEdit.addEventListener('click', () => {
  openPropfilePopup();
  editValid.resetValidation();
});

buttonOpenAddPopup.addEventListener('click', () => {
  popupCard.open();
  addValid.resetValidation();
});

buttonOpenAvatarPopup.addEventListener('click', () => {
  popupAvatar.open();
  avatarValidator.resetValidation();
});

