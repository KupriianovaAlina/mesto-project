import { activateButton, disableButton, erasePreviousErrors } from "./validate.js";

// функция, навешивающая отслеживание нажатия Esc при открытии модального окна
function handleEscPress(event) {
    // Если пользователь нажал Esc
    const popup = document.querySelector('.popup_opened')
    if (event.key === "Escape")
        closeModal(popup);
}

// функция открытия любого модального окна
export function openModal(element) {
    erasePreviousErrors(element);

    // если это модалка добавления карточки, то блокируем кнопку сабмита, а если редактирования - разблочим
    if (element.id === "popup-add-card") {
        console.log("проверка на вид модалки");
        disableButton(element);
    }
    if (element.id === "popup-edit-profile") { activateButton(element) };

    element.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscPress)
}

// функция закрытия любого модального окна
export function closeModal(element) {
    element.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscPress)
}

// функция, навешивающая слушатель клика на оверлей модального окна
function setEventListenerOnPopup(popup) {
    popup.addEventListener('click', (event) => {
        if (!event.target.closest('.popup__container'))
            closeModal(popup);
    });
}

// функция, передающая все модальные окна функции setEventListenerOnPopup поочереди
export function enablePopupToClose() {
    const popupList = Array.from(document.querySelectorAll(".popup"));

    popupList.forEach((popup) => {
        setEventListenerOnPopup(popup);
    });
}
