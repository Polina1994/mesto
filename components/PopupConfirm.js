import {Popup } from "../components/Popup.js";

export class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popupElement.querySelector('.popup-confirm__button');
    this._submitCallback = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof this._submitCallback == 'function') {
        this._submitCallback();
      }
    });
  }

  setSubmitCallback(onSubmit) {
    this._submitCallback = onSubmit;
  }
}
