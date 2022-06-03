//    ВАЛИДАЦИЯ ФОРМ

const form = document.querySelector('.form')
const formInput = form.querySelector('.popup__input')
const formError = form.querySelectorAll(`.${formInput.id}-error`)


const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error')
    errorElement.textContent = errorMessage
    errorElement.classList.add('form__input-error_active')
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error')
    errorElement.classList.remove('form__input-error_active')
    errorElement.textContent = ''
}

//проверяет инпут на корректность введенных данных

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideInputError(formElement, inputElement)
    }
}

//слушатели для всех инпутов

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
    const buttonElement = formElement.querySelector('.popup__button')
    toggleButtonState(inputList, buttonElement)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement)
            toggleButtonState(inputList, buttonElement)
        });
    });
};


//валидация для всех форм
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'))
    formList.forEach((formElement) => {
      setEventListeners(formElement)
    })
}
enableValidation()

//обход массива для кнопки
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}

//функция блокировки кнопки "Отправить"

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('button_inactive')
    } else {
        buttonElement.classList.remove('button_inactive')
    }
}


enableValidation ({
  formSelector: 'form',
  inputSelector: 'form__input',
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: '`.${inputElement.id}-error`',
  errorInput: 'form__input-error'
})

