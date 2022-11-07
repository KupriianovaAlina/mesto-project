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
export const editProfileSubmitButton = popupEditProfile.querySelector(".popup__button");
export const popupAddCard = document.querySelector("#popup-add-card");
export const addCardButton = popupAddCard.querySelector(".popup__button");
export const closeButtonProfile = document.querySelector("#close-button-profile");
export const closeButtonCard = document.querySelector("#close-button-card");
export const closeButtonDeleteCard = document.querySelector("#close-button-delete");
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
export const cardWindowTitle = cardWindow.querySelector(".photo-window__title");
export const cardWindowImg = cardWindow.querySelector(".photo-window__img");
export const profileAvatarImg = document.querySelector(".profile__avatar-img");
export const popUpDeleteCard = document.querySelector("#popup-delete-card");
export const submitButtonDelete = document.querySelector("#submit-button-delete");
export const profileAvatar = document.querySelector(".profile__avatar");
export const profileImgModal = document.querySelector("#popup-chage-photo");
export const profileImgModalInput = profileImgModal.querySelector(".popup__input");
export const closeButtonProfileImgModal = document.querySelector("#close-button-profile-img");
export const changePhotoButton = document.querySelector("#button-change-photo");

export const closeButtons = document.querySelectorAll(".popup__close-button");