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

function openCard(name, link) {
  cardWindow.querySelector(".photo-window__title").textContent = name;
  cardWindow.querySelector(".photo-window__title").alt = name;
  cardWindow.querySelector(".photo-window__img").src = link;

  cardWindow.classList.add("popup_opened");

  closeButtonCardWindow.addEventListener("click", function () {
    cardWindow.classList.remove("popup_opened");
  });
}

function addCard(data) {
  // клонируем содержимое тега template
  const elementCard = elementTemplate.querySelector(".element").cloneNode(true);
  const likeButton = elementCard.querySelector(".element__like-button");
  const deleteButton = elementCard.querySelector(".element__delete-button");
  const elementPhoto = elementCard.querySelector(".element__photo");
  const elementPlace = elementCard.querySelector(".element__place");

  // наполняем содержимым
  elementPlace.textContent = data.name;
  elementPhoto.src = data.link;
  elementPhoto.alt = data.name;

  // делаем кликабельными лайки
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__like-button_active");
  });

  // делаем рабочим кнопку удалить
  deleteButton.addEventListener("click", function () {
    deleteButton.parentNode.remove();
  });

  // делаем возможным открыть карточку в отдельной модалке
  elementPhoto.addEventListener("click", function () {
    openCard(elementPlace.textContent, elementPhoto.src);
  });

  // отображаем на странице
  elementsSection.prepend(elementCard);
}

initialCards.forEach(addCard);

// открываем модалку редактирования
editButton.addEventListener("click", function () {
  popupEditProfile.classList.add("popup_opened");

  // подгружаем данные из профиля в форму
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
});

// Обработчик «отправки» формы редактирования, хотя пока она никуда отправляться не будет
function formSubmitHandlerProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  popupEditProfile.classList.remove("popup_opened");
}

formInfo.addEventListener("submit", formSubmitHandlerProfile);

// закрываем модалку редактирования
closeButtonProfile.addEventListener("click", function () {
  popupEditProfile.classList.remove("popup_opened");
});

// открываем модалку добавления карточки
addButton.addEventListener("click", function () {
  popupAddCard.classList.add("popup_opened");
});

// Обработчик «отправки» формы добавления карточки
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  popupAddCard.classList.remove("popup_opened");

  if (inputCard.value && inputLink.value) {
    const data = { name: inputCard.value, link: inputLink.value };
    addCard(data);
  }

  inputCard.reset();
  inputLink.reset();
}

formCard.addEventListener("submit", profileFormSubmitHandler);

// закрываем модалку добавления карточки
closeButtonCard.addEventListener("click", function () {
  popupAddCard.classList.remove("popup_opened");
});
