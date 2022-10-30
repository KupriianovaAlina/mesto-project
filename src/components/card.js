import { elementTemplate } from "./constants.js"
import { openCard } from "../index.js"
import { isImage } from "./utils.js"
import noPhoto from '../../images/no-photo.png';

// функция добавления карточки места на страницу
export function createCard(data) {
    // клонируем содержимое тега template
    const elementCard = elementTemplate.querySelector(".element").cloneNode(true);
    const likeButton = elementCard.querySelector(".element__like-button");
    const deleteButton = elementCard.querySelector(".element__delete-button");
    const elementPhoto = elementCard.querySelector(".element__photo");
    const elementPlace = elementCard.querySelector(".element__place");

    // наполняем карточку содержимым
    elementPlace.textContent = data.name;
    elementPhoto.alt = data.name;

    // добовляем в карточку изображение (если есть, иначе фото-заглушку)
    if (isImage(data.link)) {
        elementPhoto.src = data.link
    } else {
        elementPhoto.src = noPhoto;
    };

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