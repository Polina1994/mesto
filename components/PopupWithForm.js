import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(".popup__form");
    this._formInputs = Array.from(this._formElement.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    const formValue = {}
    this._formInputs.forEach((input) => {
      formValue[input.name] = input.value;
    });

    return formValue;
  }


  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

