const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form')
const closePopupButton = document.querySelector('.popup__close-button'); 
const openPopupButtons = document.querySelector('.open-popup');
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const inputName = document.querySelector('.popup__input_value_name')
const inputJob = document.querySelector('.popup__input_value_job')


//открытие попапа
function openEditPopup() {
    popup.classList.add('popup_is-opened')
    inputName.value = profileName.textContent
    inputJob.value = profileJob.textContent
};
openPopupButtons.addEventListener('click', openEditPopup)


// закрытие попапа
function closePopup() {
    popup.classList.remove('popup_is-opened')
}
closePopupButton.addEventListener('click', closePopup)

//сохранение информации
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup();
}
popupForm.addEventListener('submit', formSubmitHandler)


// добавление карточек


const initialCardList = document.querySelector('.elements')
const elementTemplate = document.querySelector('#element-template').content;

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


  const elementInfo = initialCards.map(function (item) {
      return {
          name: item.name,
          link: item.link
      }
  })

  function render() {
      elementInfo.forEach(renderCard)
  }
  function renderCard({name, link}) {
      const placeElement = elementTemplate.querySelector('.element').cloneNode(true)

      placeElement.querySelector('.element__title').textContent = name
      placeElement.querySelector('.element__image').src = link

      placeElement.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.setAttribute('active', true)
    })

        initialCardList.prepend(placeElement)
  }
  render()

    //лайк 

  


