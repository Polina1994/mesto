import {Popup} from "../components/Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector('.popup-image__title');
    this._image = this._popup.querySelector('.popup-image__image');
  }

  open(name, link) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
  }
}