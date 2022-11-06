// функция, навешивающая отслеживание нажатия Esc при открытии модального окна
function handleEscPress(event) {
    // Если пользователь нажал Esc
    if (event.key === "Escape") {
        const popup = document.querySelector('.popup_opened');
        closeModal(popup);
    }
}

// функция открытия любого модального окна
export function openModal(element) {
    element.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscPress);
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
