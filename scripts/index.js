const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button'); 
const openPopupButtons = document.querySelector('.open-popup');
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const inputName = document.querySelector('.popup__input_value_name')
const inputJob = document.querySelector('.popup__input_value_job')


//открытие попапа
function openPopup() {
    popup.classList.add('popup__opened')
    inputName.value = profileName.textContent
    inputJob.value = profileJob.textContent
};
openPopupButtons.addEventListener('click', openPopup)
// закрытие попапа
function closePopup() {
    popup.classList.remove('popup__opened')
}
closePopupButton.addEventListener('click', closePopup)

//сохранение информации
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup();
}
popup.addEventListener('submit', formSubmitHandler)