import './index.css';
import {
  popupEditProfile, closeButtonCardWindow, closeButtonCard, closeButtonProfile, popupAddCard, cardWindow,
  cardWindowTitle, cardWindowImg, inputCard, inputLink, addButton, inputName, inputOccupation, profileName,
  profileOccupation, formInfo, editButton, elementsSection, formCard, formClasses, profileAvatar, closeButtonDeleteCard,
  popUpDeleteCard, profileAvatarImg, profileImgModal, closeButtonProfileImgModal, changePhotoButton, profileImgModalInput,
  addCardButton, editProfileSubmitButton
} from "./components/constants.js"
import { closeModal, openModal, enablePopupToClose, handleEscPress } from "./components/modal.js"
import { createCard } from "./components/card";
import { enableValidation, erasePreviousErrors, activateButton, disableButton, erasePreviousInputs } from "./components/validate.js";
import { isImage } from './components/utils.js';
import noPhoto from './images/no-photo.png';
import { patchUser, uploadCard, updateAvatar, getProfile, getCards } from './components/api.js';

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

  editProfileSubmitButton.textContent = "Сохранение..."

  const body = JSON.stringify({
    name: inputName.value,
    about: inputOccupation.value
  })

  patchUser(body)
    .then(() => {
      profileName.textContent = inputName.value;
      profileOccupation.textContent = inputOccupation.value;
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => { editProfileSubmitButton.textContent = "Сохранить" })
}

// функция-обработчик «отправки» формы добавления карточки
export function handleCardFormSubmit(evt) {
  evt.preventDefault();

  addCardButton.textContent = "Сохранение..."

  if (inputCard.value && inputLink.value) {
    const info = { name: inputCard.value, link: inputLink.value };

    // подгружаем карточку на сервер
    const body = JSON.stringify({
      name: inputCard.value,
      link: inputLink.value
    })

    uploadCard(body)
      .then((data) => {
        elementsSection.prepend(createCard(data))
        closeModal(popupAddCard);
        evt.target.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { addCardButton.textContent = "Сохранить" })
  }
}

// функция-обработчик открытия модалки карточек
function handleCardModalOpening() {
  disableButton(popupAddCard, formClasses)
  erasePreviousInputs(popupAddCard, formClasses)
  erasePreviousErrors(popupAddCard, formClasses)
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

// навешиваем на кнопку закрытия модалки "вы уверены?" слушатель клика
closeButtonDeleteCard.addEventListener("click", function () {
  closeModal(popUpDeleteCard);
});

// навешиваем на кнопку закрытия модалки "обновить аватар" слушатель клика
closeButtonProfileImgModal.addEventListener("click", function () {
  closeModal(profileImgModal);
});

// делаем кнопку сохранить модалки "обновить аватар" рабочей
changePhotoButton.addEventListener("click", function (evt) {
  let photo;

  changePhotoButton.textContent = "Сохранение..."

  // если в строчке ссылка не на картинку или строчка пустая, мы берем вместо нового фото фото-заглушку
  if ((isImage(profileImgModalInput.value)) || (!profileImgModalInput.value)) {
    photo = profileImgModalInput.value;
  } else {
    photo = noPhoto;
  }

  const body = JSON.stringify({
    avatar: photo
  })

  updateAvatar(body)
    .then(() => {
      inItProfile()
      closeModal(profileImgModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => { changePhotoButton.textContent = "Сохранить" })
})

// навешиваем на аватар слушатель клика
profileAvatar.addEventListener("click", function () {
  openModal(profileImgModal);
  profileImgModalInput.value = "";
})

// навешиваем на кнопку добавления карточки слушатель клика
addButton.addEventListener("click", handleCardModalOpening);

// навешиваем на кнопку редактирования профиля слушатель клика
editButton.addEventListener("click", handleProfileModalOpening);

// добавляем слушатели submit на формы и отменяем автоматическую перезагрузку страницы
formInfo.addEventListener("submit", handleFormSubmitProfile);
formCard.addEventListener("submit", handleCardFormSubmit);

// реализуем закрытие всех попапов при нажатии на оверлей
enablePopupToClose();

//валидируем все формы 
enableValidation(formClasses);

export let myId;

// наполняем профиль данными с сервера
function inItProfile() {
  getProfile()
    .then((info) => {
      profileName.textContent = info.name;
      profileOccupation.textContent = info.about;
      profileAvatarImg.src = info.avatar;
      myId = info._id;
    })
    .catch((err) => {
      console.log(err);
    });
}

// подгружаем карточки дргуих студентов с сервера
function initInitialCards() {
  getCards()
    .then((cardsList) => {
      elementsSection.textContent = ''
      cardsList.forEach((data) => elementsSection.append(createCard(data)));
    })
    .catch((err) => {
      console.log(err);
    });
}

// Разная логика в then, поэтому не объединить в Promise.all
inItProfile();
initInitialCards();

