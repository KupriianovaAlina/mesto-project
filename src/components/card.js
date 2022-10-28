import { elementTemplate, elementsSection } from "./constants.js"

// функция добавления карточки места на страницу
function createCard(data) {
    // клонируем содержимое тега template
    const elementCard = elementTemplate.querySelector(".element").cloneNode(true);
    const likeButton = elementCard.querySelector(".element__like-button");
    const deleteButton = elementCard.querySelector(".element__delete-button");
    const elementPhoto = elementCard.querySelector(".element__photo");
    const elementPlace = elementCard.querySelector(".element__place");

    // наполняем карточку содержимым
    elementPlace.textContent = data.name;
    elementPhoto.src = data.link;
    elementPhoto.alt = data.name;

    // делаем кликабельными лайк карточки
    likeButton.addEventListener("click", function () {
        likeButton.classList.toggle("element__like-button_active");
    });

    // делаем рабочей кнопку удалить
    deleteButton.addEventListener("click", function (evt) {
        evt.target.closest(".element").remove();
    });

    // делаем возможным открыть карточку в отдельной модалке
    elementPhoto.addEventListener("click", function () {
        openCard(elementPlace.textContent, elementPhoto.src);
    });

    return elementCard;
}

// функция добавления карточки на страницу
export function renderCard(data) {
    elementsSection.prepend(createCard(data));
}

