import './index.css';

import { popupEditProfile } from "./components/constants.js"
import { closeButtonCardWindow } from "./components/constants.js"
import { cardWindow } from "./components/constants.js"
import { closeButtonCard } from "./components/constants.js"
import { closeButtonProfile } from "./components/constants.js"
import { popupAddCard } from "./components/constants.js"
import { closeModal } from "./components/modal.js"

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

import { addButton } from "./components/constants.js";
import { openModal } from "./components/modal.js";

// навешиваем на кнопку добавления карточки слушатель клика
addButton.addEventListener("click", function () {
  openModal(popupAddCard);
});

import { inputName } from "./components/constants.js";
import { inputOccupation } from "./components/constants.js";
import { profileName } from "./components/constants.js";
import { profileOccupation } from "./components/constants.js";
import { formInfo } from "./components/constants.js";
import { editButton } from "./components/constants.js";
import { isValid, toggleButtonState } from "./components/validate.js";

// навешиваем на кнопку редактирования профиля слушатель клика
editButton.addEventListener("click", function () {
  openModal(popupEditProfile);

  // подгружаем данные из профиля в форму
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;

  isValid(formInfo, inputName);
  isValid(formInfo, inputOccupation);

  toggleButtonState([inputName, inputOccupation], popupEditProfile.querySelector(".popup__button"));
});

import { initialCards } from "./components/constants.js";
import { renderCard } from "./components/card.js";

// добавляем 6 карточек на страницу по умолчанию
initialCards.forEach(renderCard);

import { formCard } from "./components/constants.js";
import { formSubmitHandlerProfile, profileFormSubmitHandler } from "./components/modal.js";

// добавляем слушатели submit на формы и отменяем автоматическую перезагрузку страницы
formInfo.addEventListener("submit", formSubmitHandlerProfile);
formCard.addEventListener("submit", profileFormSubmitHandler);


import { enablePopupToClose } from "./components/modal.js";

// реализуем закрытие всех попапов при нажатии на оверлей
enablePopupToClose();


import { enableValidation } from "./components/validate.js";

//валидируем все формы 
enableValidation();
