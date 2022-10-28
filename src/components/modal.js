// функция открытия любого модального окна
export function openModal(element) {
    element.classList.add("popup_opened");

    setEscEventListenerOnPopup(element);
}

// функция закрытия любого модального окна
export function closeModal(element) {
    element.classList.remove("popup_opened");
}

// функция, навешивающая слушатель клика на оверлей модального окна
function setEventListenerOnPopup(popup) {
    popup.addEventListener('click', (event) => {
        if (!event.target.closest('.popup__container'))
            closeModal(popup);
    });
}

// функция, передаваемая все модальные окна функции setEventListenerOnPopup поочереди
export function enablePopupToClose() {
    const popupList = Array.from(document.querySelectorAll(".popup"));

    popupList.forEach((popup) => {
        setEventListenerOnPopup(popup);
    });
}

// функция, навешивающая отслеживание нажатия Esc при открытии модального окна
function setEscEventListenerOnPopup(popup) {
    document.addEventListener("keydown", (evt) => {

        // Если пользователь нажал Esc
        if (evt.key === "Escape")
            closeModal(popup);

    });
}

import { cardWindow } from "./constants.js"

// функция открытия модального окна с фотографией
function openCard(name, link) {
    cardWindow.querySelector(".photo-window__title").textContent = name;
    cardWindow.querySelector(".photo-window__title").alt = name;
    cardWindow.querySelector(".photo-window__img").src = link;

    openModal(cardWindow);
}

import { profileName, profileOccupation, inputName, inputOccupation, popupEditProfile } from "./constants.js"

// функция-обработчик «отправки» формы редактирования
export function formSubmitHandlerProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileOccupation.textContent = inputOccupation.value;
    closeModal(popupEditProfile);
}

import { popupAddCard, inputCard, inputLink } from "./constants.js"
import { renderCard } from "./card.js"

// функция-обработчик «отправки» формы добавления карточки
export function profileFormSubmitHandler(evt) {
    evt.preventDefault();
    closeModal(popupAddCard);

    if (inputCard.value && inputLink.value) {
        const info = { name: inputCard.value, link: inputLink.value };
        renderCard(info);
    }

    evt.target.reset();
}
