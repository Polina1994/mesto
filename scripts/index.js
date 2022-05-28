const popupEdit = document.querySelector('.popup-edit');   //попап редактирования
const popupAdd = document.querySelector('.popup-add');  //попап добавления
const popup = document.querySelectorAll('.popup');  //попап
const popupForm = document.querySelector('.popup__form')  //попап форма
const popupImage = document.querySelector('.popup-image')

const addButton = document.querySelector('.profile__add-button')  //кнопка ред
const editButton = document.querySelector('.profile__edit-button') //кнопка добав
const popupAddButton = document.querySelector('.popup-add__button')
const editPopupCloseButton = document.querySelector('.popup-edit__close-button');  //кнопка закрытия 
const addPopupCloseButton = document.querySelector('.popup-add__close-button');  //кнопка закрытия 
const imagePopupCloseButton = document.querySelector('.popup-image__close-button')
const openPopupButtons = document.querySelector('.open-popup');  //кнопка открытия

const profileName = document.querySelector('.profile__name')  //имя
const profileJob = document.querySelector('.profile__job')  //профессия
const elementPlace = document.querySelector('.element__title')  // имя карточки
const elementLink = document.querySelector('.element__link')  // линк карточки


const inputName = document.querySelector('.popup__input_value_name')  //имя в форме
const inputJob = document.querySelector('.popup__input_value_job')  //профессия в форме
const inputPlace = document.querySelector('.popup__input_value_place')  //название места карточки в форме
const inputLink = document.querySelector('.popup__input_value_link')  //картинка карточки в форме

const cardList = document.querySelector('.elements') //карточки
const elementTemplate = document.getElementById('element-template').content; 

const popupOpenImage = document.querySelector('.popup-image__image')
const popupOpenTitle = document.querySelector('.popup-image__title')

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
imagePopupCloseButton.addEventListener('click', function() {
  closePopup(popupImage)
})

//сохранение информации
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(popupEdit);
}
popupForm.addEventListener('submit', formSubmitHandler)

//создание новой карточки
const addCard = (card) =>{
  cardList.prepend(card);
}

//добавление новой карточки

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const card = {}
  card.name = inputPlace.value
  card.link = inputLink.value
  addCard(renderCard(card))
  evt.target.reset()
  closePopup(popupAdd)
}
popupAdd.addEventListener('submit', handleAddCardSubmit)



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


    //функция отображения карточек
function render(cards) {
    cards.forEach((item) => {
      cardList.append(renderCard(item))
    })
}
//карточка
const renderCard = ({link, name}) => {
    const placeElement = elementTemplate.querySelector('.element').cloneNode(true)

    placeElement.querySelector('.element__title').textContent = name
    const image = placeElement.querySelector('.element__image');
    
    image.src = link
    image.alt = link
    
    placeElement.querySelector('.element__like').addEventListener('click', function(evt) {
      evt.target.classList.toggle('element__like-active');  //лайк
    })


    placeElement.querySelector('.element__trash').addEventListener('click', function(evt) {
      evt.target.closest('.element').remove(); //удаление карточки

      })
    const cardImage = placeElement.querySelector('.element__image')
    cardImage.addEventListener('click', () => {
        popupOpenImage.src = link;
        popupOpenTitle.alt = name;
        popupOpenTitle.textContent = name;
        openPopup(popupImage)
      })

 
    return placeElement
      } 

render(initialCards)
