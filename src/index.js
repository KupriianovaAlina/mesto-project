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
import noPhoto from '../images/no-photo.png';
import { patchUser, uploadCard, updateAvatar, getProfile, getCards } from './components/api.js';

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

  editProfileSubmitButton.innerHTML = "Сохранение..."

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
    });
}

// функция-обработчик «отправки» формы добавления карточки
export function handleCardFormSubmit(evt) {
  evt.preventDefault();

  addCardButton.innerHTML = "Cохранение..."

  if (inputCard.value && inputLink.value) {
    const info = { name: inputCard.value, link: inputLink.value };

    // подгружаем карточку на сервер
    const body = JSON.stringify({
      name: inputCard.value,
      link: inputLink.value
    })

    uploadCard(body)
      .then(() => {
        initInitialCards();
        closeModal(popupAddCard);
        evt.target.reset();
      }).catch((err) => {
        console.log(err);
      });
  }
}

// функция-обработчик открытия модалки карточек
function handleCardModalOpening() {
  disableButton(popupAddCard, formClasses)
  erasePreviousInputs(popupAddCard, formClasses)
  erasePreviousErrors(popupAddCard, formClasses)
  openModal(popupAddCard);
  addCardButton.innerHTML = "Сохранить"
  document.addEventListener("keydown", handleEscPress);
}

// функция-обработчик открытия модалки редактирвоания профиля
function handleProfileModalOpening() {
  erasePreviousErrors(popupEditProfile, formClasses);
  activateButton(popupEditProfile, formClasses);

  editProfileSubmitButton.innerHTML = "Сохранить";

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

  // если в строчке ссылка не на картинку или строчка пустая, мы берем вместо нового фото фото-заглушку
  if ((isImage(profileImgModalInput.value)) || (!profileImgModalInput.value)) {
    photo = profileImgModalInput.value;
  } else {
    photo = noPhoto;
  }

  changePhotoButton.innerHTML = "Сохранение..."

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
    });
})

// навешиваем на аватар слушатель клика
profileAvatar.addEventListener("click", function () {
  openModal(profileImgModal);
  changePhotoButton.innerHTML = "Сохранить"
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

inItProfile();


// подгружаем карточки дргуих студентов с сервера
export function initInitialCards() {
  getCards()
    .then((cardsList) => {
      elementsSection.innerHTML = ''
      cardsList.forEach(renderCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

initInitialCards();

