const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container'); 
const closePopupButton = document.querySelector('.popup_close'); 
const openPopupButtons = document.querySelector('.open-popup');
const profileName = document.querySelector('.profile__info_name')
const profileJob = document.querySelector('.profile__info_job')
const inputName = document.querySelector('.input__name')
const inputJob = document.querySelector('.input__job')
//открытие попапа

function openPopup() {
    popup.classList.add('popup_opened')
    popupContainer.classList.add('popup__container_opened')
};
openPopupButtons.addEventListener('click', openPopup)
// закрытие попапа
function closePopup() {
    popup.classList.remove('popup_opened')
}
closePopupButton.addEventListener('click', closePopup)

//редактирование профиля
function editProfile() {
    inputName.value = profileName.textContent
    inputJob.value = profileJob.textContent
}
editProfile();

//сохранение информации

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup();
}
popupContainer.addEventListener('submit', formSubmitHandler)