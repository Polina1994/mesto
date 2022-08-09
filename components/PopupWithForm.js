import {Popup} from "../components/Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._submitButton = this._popupForm.querySelector('[type="submit"]');
  }
  _getInputValues() {
    const result = {};
    this._inputList.forEach((inputElement) => {
      result[inputElement.name] = inputElement.value;
    });
    return result; 
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setLoadingState(enabled) {
    if (enabled) {
      this._submitButton.textContent = 'Сохранение...'
      this._submitButton.setAttribute('disabled', 'true');
    } else {
      this._submitButton.innerText = 'Сохранить'
      if (this._submitButton.hasAttribute('disabled'))
        this._submitButton.removeAttribute('disabled');
    }
  }
}