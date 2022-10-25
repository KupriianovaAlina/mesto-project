import '../pages/index.css';

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector("#popup-edit-profile");
const popupAddCard = document.querySelector("#popup-add-card");
const closeButtonProfile = document.querySelector("#close-button-profile");
const closeButtonCard = document.querySelector("#close-button-card");
const closeButtonCardWindow = document.querySelector("#close-button-img");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const inputName = document.querySelector('input[name="name"]');
const inputOccupation = document.querySelector('input[name="occupation"]');
const formInfo = document.querySelector('form[name="info"]');
const formCard = document.querySelector('form[name="card"]');
const elementTemplate = document.querySelector("#element").content;
const elementsSection = document.querySelector(".elements");
const inputCard = document.querySelector('input[name="card"]');
const inputLink = document.querySelector('input[name="link"]');
const cardWindow = document.querySelector("#photo-window");
const initialCards = [
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

// функция открытия любого модального окна
function openModal(element) {
  element.classList.add("popup_opened");
}

// функция закрытия любого модального окна
function closeModal(element) {
  element.classList.remove("popup_opened");
}

// функция открытия модального окна с фотографией
function openCard(name, link) {
  cardWindow.querySelector(".photo-window__title").textContent = name;
  cardWindow.querySelector(".photo-window__title").alt = name;
  cardWindow.querySelector(".photo-window__img").src = link;

  openModal(cardWindow);
}

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
function renderCard(data) {
  elementsSection.prepend(createCard(data));
}

// функция-обработчик «отправки» формы редактирования
function formSubmitHandlerProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closeModal(popupEditProfile);
}

// функция-обработчик «отправки» формы добавления карточки
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  closeModal(popupAddCard);

  if (inputCard.value && inputLink.value) {
    const info = { name: inputCard.value, link: inputLink.value };
    renderCard(info);
  }

  evt.target.reset();
}

// вешаем listener на кнопку закрытия модального окна с фотографией
closeButtonCardWindow.addEventListener("click", function () {
  closeModal(cardWindow);
});

// добавляем 6 карточек на страницу по умолчанию
initialCards.forEach(renderCard);

// открываем модалку редактирования
editButton.addEventListener("click", function () {
  openModal(popupEditProfile);

  // подгружаем данные из профиля в форму
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
});

formInfo.addEventListener("submit", formSubmitHandlerProfile);

// закрываем модалку редактирования
closeButtonProfile.addEventListener("click", function () {
  closeModal(popupEditProfile);
});

// открываем модалку добавления карточки
addButton.addEventListener("click", function () {
  openModal(popupAddCard);
});

formCard.addEventListener("submit", profileFormSubmitHandler);

// закрываем модалку добавления карточки
closeButtonCard.addEventListener("click", function () {
  closeModal(popupAddCard);
});
