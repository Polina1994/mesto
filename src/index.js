import '../pages/index.css'
import { Card } from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js'
import {UserInfo} from '../components/UserInfo.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import { initialCards, validate, buttonPopupEdit, buttonPopupAdd, inputName, inputJob, formAdd, formEdit, userInfoConst, profileName, profileJob } from '../utils/constants'


const editFormValid = new FormValidator(validate, formEdit)
const addFormValid = new FormValidator(validate, formAdd)

editFormValid.enableValidation()
addFormValid.enableValidation()


const popupWithImage = new PopupWithImage('.popup-image')
popupWithImage.setEventListeners()

const popupEdit = new PopupWithForm({
  handleFormSubmit: (values) => {
    userInfo.setUserInfo({name: values['user-name'], job: values['user-job']})
    popupEdit.close()
  }
}, '.popup-edit') 
popupEdit.setEventListeners()

function openEditPopup() {
  editFormValid.toggleButtonState()
  popupEdit.open()
  const values = userInfo.getUserInfo()
  inputName.value = values['user-name']
  inputJob.value = values['user-job']
}

buttonPopupEdit.addEventListener('click', openEditPopup)

const popupAdd = new PopupWithForm({
  handleFormSubmit: (values) => {
    cardList.addItem(cardNew(values))
    popupAdd.close()
  }
}, '.popup-add')
popupAdd.setEventListeners()

function openAddPopup() {
  addFormValid.toggleButtonState()
  // addFormValid.resetValidation()
  popupAdd.open()
}
buttonPopupAdd.addEventListener('click', openAddPopup)

const userInfo = new UserInfo(userInfoConst)

const cardList = new Section({
  data: initialCards,
  renderer: (item) => cardList.addItem(cardNew(item))
}, '.elements')

cardList.renderSection()

function cardNew(data) {
  const cards = new Card(data, '.card', handleCardClick)
  return cards.generateCard()
}


function handleCardClick(name, link) {
  popupWithImage.open(name, link)
}

