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

// querySelectors
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const popupEditProfile = document.querySelector("#popup-edit-profile");
export const popupAddCard = document.querySelector("#popup-add-card");
export const closeButtonProfile = document.querySelector("#close-button-profile");
export const closeButtonCard = document.querySelector("#close-button-card");
export const closeButtonCardWindow = document.querySelector("#close-button-img");
export const profileName = document.querySelector(".profile__name");
export const profileOccupation = document.querySelector(".profile__occupation");
export const inputName = document.querySelector('input[name="name"]');
export const inputOccupation = document.querySelector('input[name="occupation"]');
export const formInfo = document.querySelector('form[name="info"]');
export const formCard = document.querySelector('form[name="card"]');
export const elementTemplate = document.querySelector("#element").content;
export const elementsSection = document.querySelector(".elements");
export const inputCard = document.querySelector('input[name="card"]');
export const inputLink = document.querySelector('input[name="link"]');
export const cardWindow = document.querySelector("#photo-window");

// данные для начальных 6 карточек
export const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];