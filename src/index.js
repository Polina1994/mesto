import "../pages/index.css";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupConfirm } from "../components/PopupConfirm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
const editPopup = document.querySelector(".popup-edit");
const nameInput = editPopup.querySelector(".popup__input_value_name");
const jobInput = editPopup.querySelector(".popup__input_value_job");
const addPopup = document.querySelector(".popup-add");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonOpenAddPopup = document.querySelector(".profile__add-button");
const avatarPopup = document.querySelector(".popup-avatar");
const buttonOpenAvatarPopup = document.querySelector(".profile__avatar-overlay");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-46",
  headers: {
    authorization: "b728ad0c-8a51-4521-be05-924ef3deb392",
    "Content-Type": "application/json",
  },
});

const editValid = new FormValidator(validationConfig, editPopup);
editValid.enableValidation();

const addValid = new FormValidator(validationConfig, addPopup);
addValid.enableValidation();

const avatarValidator = new FormValidator(validationConfig, avatarPopup);
avatarValidator.enableValidation();

const popupWithImage = new PopupWithImage(".popup-image");
popupWithImage.setEventListeners();

const popupProfile = new PopupWithForm(".popup-edit", editProfileInfo);
popupProfile.setEventListeners();

const popupCard = new PopupWithForm(".popup-add", addNewCard);
popupCard.setEventListeners();

const popupConfirm = new PopupConfirm(".popup-confirm");
popupConfirm.setEventListeners();

const popupAvatar = new PopupWithForm(".popup-avatar", setNewAvatar);
popupAvatar.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__job",
  profileAvatar: ".profile__avatar",
});

const cardList = new Section((item) => {
  cardList.prependItem(createCard(item));
}, ".elements");

Promise.all([api.getUserData(), api.getCards()])
  .then(([result, cards]) => {
    userInfo.setUserInfo({
      name: result.name,
      about: result.about,
      profileAvatar: result.avatar,
    });
    userInfo.setUserId(result._id)
    cardList.renderSection(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(data) {
  const userId = userInfo.id
  const cards = new Card(data, ".card", handleCardClick, 
  {
    handleDeleteClick: () => openPopupConfirm(data._id, cards),

    handleLikeCard: () => {
      api
        .likeCard(data._id, cards)
        .then((res) => {
          cards.likeCard()
          cards.renewLikes(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDislikeCard: () =>
      api
        .dislikeCard(data._id, cards)
        .then((res) => {
          cards.dislikeCard()
          cards.renewLikes(res);
          
        })
        .catch((err) => {
          console.error(err);
        })
    
  }, userId)
  return cards.generateCard();
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function openPopupConfirm(id, cards) {
  popupConfirm.open(() => {
    api
      .deleteCard(id)
      .then(() => {
        cards.deleteCard();
        popupConfirm.close();
      })
      .catch((err) => {
        console.error(err);
      });
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
  api
    .setUserData({ name: data.name, about: data.about })

    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        about: res.about,
        userId: res._id,
        profileAvatar: res.avatar,
      });
      popupProfile.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => popupProfile.setLoadingState(false));
}

function addNewCard(result) {
  popupCard.setLoadingState(true);
  api
    .addNewCard(result)
    .then((result) => {
      cardList.prependItem(createCard(result));
    })
    .then(() => {
      popupCard.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => popupCard.setLoadingState(false));
}

function setNewAvatar(data) {
  popupAvatar.setLoadingState(true);
  api
    .setNewAvatar({ avatar: data.avatar })
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        about: res.about,
        userId: res._id,
        profileAvatar: res.avatar,
      });
      popupAvatar.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => popupAvatar.setLoadingState(false));
}

buttonEdit.addEventListener("click", () => {
  openPropfilePopup();
  editValid.resetValidation();
});

buttonOpenAddPopup.addEventListener("click", () => {
  popupCard.open();
  addValid.resetValidation();
});

buttonOpenAvatarPopup.addEventListener("click", () => {
  popupAvatar.open();
  avatarValidator.resetValidation();
});
