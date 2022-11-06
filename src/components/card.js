import { elementTemplate } from "./constants.js"
import { openCard, myId } from "../index.js"
import { isImage } from "./utils.js"
import noPhoto from '../images/no-photo.png';
import { addLike, deleteLike, deleteCard } from "./api.js";

// функция добавления карточки места на страницу
export function createCard(data) {
    // клонируем содержимое тега template
    const elementCard = elementTemplate.querySelector(".element").cloneNode(true);
    const likeButton = elementCard.querySelector(".element__like-button");
    const numberOfLikes = elementCard.querySelector(".element__like-number");
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

    if (data.likes.some(like => like._id == myId)) {
        likeButton.classList.add("element__like-button_active");
    }

    // делаем кликабельными лайк карточки
    likeButton.addEventListener("click", function () {

        if (likeButton.classList.contains('element__like-button_active')) {
            deleteLike(data._id)
                .then((res) => {
                    numberOfLikes.textContent = res.likes.length;
                    likeButton.classList.remove("element__like-button_active");
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            addLike(data._id)
                .then((res) => {
                    numberOfLikes.textContent = res.likes.length;
                    likeButton.classList.add("element__like-button_active");
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    });

    if (data.owner._id === myId) {
        // делаем рабочей кнопку удалить
        deleteButton.addEventListener("click", function () {
            deleteCard(data._id)
                .then(() => {
                    deleteButton.closest('.element').remove()
                })
                .catch((err) => {
                    console.log(err);
                })
        });
    } else {
        deleteButton.classList.add("element__delete-button_hidden")
    };


    // делаем возможным открыть карточку в отдельной модалке
    elementPhoto.addEventListener("click", function () {
        openCard(elementPlace.textContent, elementPhoto.src);
    });

    // загружаем, сколько у нас есть лайков
    numberOfLikes.textContent = (data.likes.length === 0) ? 0 : data.likes.length;

    return elementCard;
}