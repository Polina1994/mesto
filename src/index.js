import '../pages/index.css'
import { Card } from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js'
import {UserInfo} from '../components/UserInfo.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import { initialCards, validate, buttonPopupEdit, buttonPopupAdd, inputName, inputJob, formAdd, formEdit, userSelectors, profileName, profileJob, inputPlace, inputLink } from '../utils/constants'

const editFormValid = new FormValidator(validate, formEdit)
const addFormValid = new FormValidator(validate, formAdd)

editFormValid.enableValidation()
addFormValid.enableValidation()

const popupWithImage = new PopupWithImage('.popup-image')
popupWithImage.setEventListeners()

const popupEditProfile = new PopupWithForm({
  handleFormSubmit: (values) => {
    userInfo.setUserInfo({name: values.name, job: values.job})
    popupEditProfile.close()
  }
}, '.popup-edit') 

popupEditProfile.setEventListeners()

function openEditPopup() {
  editFormValid.toggleButtonState()
  popupEditProfile.open()
  const data = userInfo.getUserInfo()
  inputName.value = data.name
  inputJob.value = data.job
}
buttonPopupEdit.addEventListener('click', openEditPopup)

const popupAddCard = new PopupWithForm({
  handleFormSubmit: (values) => {
    cardList.addItem(createCard({place: values.place, link: values.link}))
    popupAddCard.close()
  }
}, '.popup-add')
popupAddCard.setEventListeners()

function openAddPopup() {
  addFormValid.toggleButtonState()
  addFormValid.resetValidation()
  popupAddCard.open()

}
buttonPopupAdd.addEventListener('click', openAddPopup)

const userInfo = new UserInfo(userSelectors)

const cardList = new Section({
  data: initialCards,
  renderer: (item) => cardList.addItem(createCard(item))
}, '.elements')

cardList.renderSection()

function createCard(data) {
  const cards = new Card(data, '.card', handleCardClick)
  return cards.generateCard()
}

function handleCardClick(place, link) {
  popupWithImage.open(place, link)
}

