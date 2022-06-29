export class FormValidator {
    constructor(validate, form) {
        this.form = form
        this._inputSelector = validate.inputSelector
        this._submitButtonSelector = validate.submitButtonSelector
        this._inactiveButtonClass = validate.inactiveButtonClass
        this._inputErrorClass = validate.inputErrorClass
        this._errorClass = validate.errorClass
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(this.submitButtonSelector);
    }
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }
    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    };
    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
    };
    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this.toggleButtonState()
            })
        })
    }

    enableValidation() {
        this._setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
    };
    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
    };
    toggleButtonState() {
        if (this._hasInvalidInput()) {
          this._buttonElement.setAttribute("disabled", true);
          this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
          this._buttonElement.removeAttribute("disabled", false);
          this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }
}
