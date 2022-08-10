import '../pages/index.css';
import {Section} from '../components/Section.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupConfirm} from '../components/PopupConfirm.js';
import {UserInfo} from '../components/UserInfo.js';
import {api} from '../components/Api.js'
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

const cardList = new Section((item) =>{
    cardList.addItem(createCard(item))
}, '.elements');


Promise.all([                 
  api.getUserData(), 
  api.getCards() 
]) 
.then(([result, cards]) => {
  userInfo.setUserInfo({name: result.name, about: result.about, profileId: result._id, profileAvatar: result.avatar});
  cardList.renderSection(cards);
})
.catch((err)=>{              
  console.log(err);
})
function createCard(data) {
  const cards = new Card(data,'.card', handleCardClick,  {
    handleDeleteClick: () => openPopupConfirm(data._id, cards),

    handleLikeCard: () => {
      api.likesCard(data._id, cards)
      .then((res) => {
        cards.renewLikes(res)
      })
      .then(() => {
        cards.likeCard()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    handleDislikeCard: () => 
      api.dislikeCard(data._id, cards)
      .then((res) => {
        cards.dislikeCard()
        cards.renewLikes(res)
      })
      .catch((err) => {
        console.error(err); 
      }),
    userId: userInfo.getId()
   })
  return cards.generateCard();
  }

function handleCardClick(name, link) {
  popupWithImage.open(name, link)
}

function openPopupConfirm (id, cards) {
  popupConfirm.open(() => {
    api.deleteCard(id)
    .then(() => {
      cards.deleteCard();
      popupConfirm.close();
    })
    .catch((err) => {
      console.error(err); 
    });
  });
}

function dislike(id, cards) {
  api.dislikeCard(id)
    .then((result) => {
      cards.setLikes(result.likes);
    })
    .catch((err) => {
      console.error(err); 
    });
}

function like() {

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
  .then((result) => {
    cardList.addItem(createCard(result))
  })
  .then(() => {
    popupCard.close()
  })
  .catch((err) => {
    console.error(err); 
  })
  .finally(() => 
    popupCard.setLoadingState(false)
);
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