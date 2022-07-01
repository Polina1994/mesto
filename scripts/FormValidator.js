
export class FormValidator {
    constructor(validate, form) {
        this._validate = validate
        this._form = form
        
        this._inputList = Array.from(this._form.querySelectorAll(this._validate.inputSelector));
        this._buttonElement = this._form.querySelector(this._validate.submitButtonSelector);
    }
  
    _showInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validate.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._validate.errorClass);
    }
    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validate.inputErrorClass);
        errorElement.classList.remove(this._validate.errorClass);
        errorElement.textContent = "";
    };
    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement);
        } else {
          this._hideInputError(inputElement);
        }
    };
  
    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
    };
    toggleButtonState() {
        if (this._hasInvalidInput()) {
          this._buttonElement.disabled = 'disabled'
          this._buttonElement.classList.add(this._validate.inactiveButtonClass);
        } else {
          this._buttonElement.disabled = ''
          this._buttonElement.classList.remove(this._validate.inactiveButtonClass);
        }
    }
    _setEventListeners() {
        this.toggleButtonState()

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this.toggleButtonState()
            })
        })
    }
    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners()
    };
}