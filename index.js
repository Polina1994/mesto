let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container'); 
let openPopupButtons = document.querySelectorAll('.open-popup'); 
let closePopupButton = document.querySelector('.popup_close'); 

openPopupButtons.forEach((button) => { 
    button.addEventListener('click', (e) => { 
        e.preventDefault(); 
        popup.classList.add('active'); 
        popupContainer.classList.add('active'); 
    })
});
closePopupButton.addEventListener('click',() => { 
    popup.classList.remove('active'); 
    popupContainer.classList.remove('active');
});