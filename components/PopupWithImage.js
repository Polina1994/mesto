import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupOpenImage = this._popup.querySelector('.popup-image__image')
    this._popupOpenTitle = this._popup.querySelector('.popup-image__title')
  }

  open(name, link) {
    super.open();
    this._popupOpenImage.alt = name
    this._popupOpenImage.src = link
    this._popupOpenTitle.textContent = name
  }
}