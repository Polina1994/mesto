const popupEdit = document.querySelector('.popup-edit');   //попап редактирования
const popupAdd = document.querySelector('.popup-add');  //попап добавления
const popup = document.querySelectorAll('.popup');  //попап
const popupImage = document.querySelectorAll('.popup-image')
const popupForm = document.querySelector('.popup__form')  //попап форма

const addButton = document.querySelector('.profile__add-button')  //кнопка ред
const editButton = document.querySelector('.profile__edit-button') //кнопка добав
const editPopupCloseButton = document.querySelector('.popup-edit__close-button');  //кнопка закрытия 
const addPopupCloseButton = document.querySelector('.popup-add__close-button');  //кнопка закрытия 
const openPopupButtons = document.querySelector('.open-popup');  //кнопка открытия

const profileName = document.querySelector('.profile__name')  //имя
const profileJob = document.querySelector('.profile__job')  //профессия

const inputName = document.querySelector('.popup__input_value_name')  //имя в форме
const inputJob = document.querySelector('.popup__input_value_job')  //профессия в форме
const inputPlace = document.querySelector('.popup__input_value_place')  //название места карточки в форме
const inputLink = document.querySelector('.popup__input_value_link')  //картинка карточки в форме

const initialCardList = document.querySelector('.elements') //карточки
const elementTemplate = document.querySelector('#element-template').content; 

//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened')
}

//открытие попапа добавления
addButton.addEventListener('click', function () {
  openPopup(popupAdd);
})

//открытие попапа редактирования
editButton.addEventListener('click',function() {
inputName.value = profileName.textContent
inputJob.value = profileJob.textContent
openPopup(popupEdit)
})

// закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_is-opened')
}

editPopupCloseButton.addEventListener('click', function() {
  closePopup(popupEdit)
})

addPopupCloseButton.addEventListener('click', function() {
  closePopup(popupAdd)
})

//сохранение информации
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(popupEdit);
}
popupForm.addEventListener('submit', formSubmitHandler)


//добавление новой карточки

function formAddHandler(evt) {
  evt.preventDefault();
  const card = {}
  card.name = inputPlace.value
  card.link = inputLink.value
  formAddHandler.prepend(renderCard(evt))
  closePopup(popupAdd)
}

// создание карточек в html

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


    //функция добавления карточек
function render(cards) {
    cards.forEach((item) => {
      initialCardList.append(renderCard(item))
    })
}
//карточка
function renderCard({name, link}) {
    const placeElement = elementTemplate.querySelector('.element').cloneNode(true)

    placeElement.querySelector('.element__title').textContent = name
    placeElement.querySelector('.element__image').src = link

    placeElement.querySelector('.element__like').addEventListener('click', function(evt) {
      evt.target.classList.toggle('element__like-active')  //лайк
    })

    return placeElement
}
render(initialCards)

//удаление
function deleteCard(evt) {
  const card = evt.target.closest('card')
  card.remove();
}
// лайк


