import './index.css';
import {
  popupEditProfile, closeButtonCardWindow, closeButtonCard, closeButtonProfile, popupAddCard, cardWindow,
  cardWindowTitle, cardWindowImg, inputCard, inputLink, addButton, inputName, inputOccupation, profileName,
  profileOccupation, formInfo, editButton, initialCards, elementsSection, formCard, formClasses
} from "./components/constants.js"
import { closeModal, openModal, enablePopupToClose, handleEscPress } from "./components/modal.js"
import { createCard } from "./components/card";
import { enableValidation, erasePreviousErrors, activateButton, disableButton, erasePreviousInputs } from "./components/validate.js";

// функция добавления карточки на страницу
export function renderCard(data) {
  elementsSection.prepend(createCard(data));
}

// функция открытия модального окна с фотографией
export function openCard(name, link) {
  cardWindowTitle.textContent = name;
  cardWindowTitle.alt = name;
  cardWindowImg.src = link;

  openModal(cardWindow);
}

// функция-обработчик «отправки» формы редактирования
export function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closeModal(popupEditProfile);
}

// функция-обработчик «отправки» формы добавления карточки
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  if (inputCard.value && inputLink.value) {
    const info = { name: inputCard.value, link: inputLink.value };
    renderCard(info);
  }

  closeModal(popupAddCard);

  evt.target.reset();
}

// функция-обработчик открытия модалки карточек
function handleCardModalOpening() {
  disableButton(popupAddCard, formClasses)
  erasePreviousInputs(popupAddCard, formClasses)
  openModal(popupAddCard);
  document.addEventListener("keydown", handleEscPress);
}

// функция-обработчик открытия модалки редактирвоания профиля
function handleProfileModalOpening() {
  erasePreviousErrors(popupEditProfile, formClasses);
  activateButton(popupEditProfile, formClasses);

  // подгружаем данные из профиля в форму 
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;

  openModal(popupEditProfile);
  document.addEventListener("keydown", handleEscPress);
}

// навешиваем на кнопку закрытия модалки редактирования слушатель клика
closeButtonProfile.addEventListener("click", function () {
  closeModal(popupEditProfile);
});

// навешиваем на кнопку закрытия модалки с фотографией слушатель клика
closeButtonCardWindow.addEventListener("click", function () {
  closeModal(cardWindow);
});

// навешиваем на кнопку закрытия модалки карточек слушатель клика
closeButtonCard.addEventListener("click", function () {
  closeModal(popupAddCard);
});

// навешиваем на кнопку добавления карточки слушатель клика
addButton.addEventListener("click", handleCardModalOpening);

// навешиваем на кнопку редактирования профиля слушатель клика
editButton.addEventListener("click", handleProfileModalOpening);

// добавляем слушатели submit на формы и отменяем автоматическую перезагрузку страницы
formInfo.addEventListener("submit", handleFormSubmitProfile);
formCard.addEventListener("submit", handleProfileFormSubmit);

// добавляем 6 карточек на страницу по умолчанию
initialCards.forEach(renderCard);

// реализуем закрытие всех попапов при нажатии на оверлей
enablePopupToClose();

//валидируем все формы 
enableValidation(formClasses);