import {Popup } from "../components/Popup.js";

export class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup-confirm__button');
    this._submitCallback = null;
  }

  open(deleteCard) {
    super.open()
    this._deleteCard = deleteCard
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', (e) => {
      e.preventDefault();
      this._deleteCard()
    });
  }

}