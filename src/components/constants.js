// регулярное выражение для валидации форм
export const regex = /^[a-zа-яё\s-]+$/gi;

// набор классов для валидации
export const formClasses = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};