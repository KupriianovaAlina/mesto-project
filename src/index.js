import './index.css';
import {
  popupEditProfile, popupAddCard, cardWindow, inputCard, inputLink, addButton, inputName, inputOccupation, profileName,
  profileOccupation, formInfo, editButton, elementsSection, formCard, formClasses, profileAvatar, profileAvatarImg, profileImgModal,
  changePhotoButton, profileImgModalInput, addCardButton, editProfileSubmitButton, closeButtons
} from "./components/constants.js"
import { closeModal, openModal, enablePopupToClose } from "./components/modal.js"
import { createCard } from "./components/card";
import { enableValidation, erasePreviousErrors, activateButton, disableButton, erasePreviousInputs } from "./components/validate.js";
import { isImage } from './components/utils.js';
import noPhoto from './images/no-photo.png';
import { patchUser, uploadCard, updateAvatar, getProfile, getCards } from './components/api.js';

// функция-обработчик «отправки» формы редактирования
export function handleFormSubmitProfile(evt) {
  evt.preventDefault();

  editProfileSubmitButton.textContent = "Сохранение..."

  const body = {
    name: inputName.value,
    about: inputOccupation.value
  }

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

    // подгружаем карточку на сервер
    const body = {
      name: inputCard.value,
      link: inputLink.value
    }

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

// реализуем закрытие попапов по клику на крестик закрытия
closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", function (evt) {
    closeModal(evt.target.closest(".popup"));
  })
})

// делаем кнопку сохранить модалки "обновить аватар" рабочей
profileImgModal.addEventListener("submit", function (evt) {

  evt.preventDefault();

  let photo;

  changePhotoButton.textContent = "Сохранение..."

  // если в строчке ссылка не на картинку или строчка пустая, мы берем вместо нового фото фото-заглушку
  if ((isImage(profileImgModalInput.value)) || (!profileImgModalInput.value)) {
    photo = profileImgModalInput.value;
  } else {
    photo = noPhoto;
  }

  const body = {
    avatar: photo
  }

  updateAvatar(body)
    .then((res) => {
      profileAvatarImg.src = res.avatar;
      closeModal(profileImgModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => { changePhotoButton.textContent = "Сохранить" })
})

// навешиваем на аватар слушатель клика
profileAvatar.addEventListener("click", function () {
  erasePreviousInputs(profileImgModal, formClasses);
  erasePreviousErrors(profileImgModal, formClasses);
  disableButton(profileImgModal, formClasses);

  openModal(profileImgModal);
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

Promise.all([getProfile(), getCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileOccupation.textContent = userData.about;
    profileAvatarImg.src = userData.avatar;
    myId = userData._id;

    elementsSection.innerHTML = '';
    cards.forEach((data) => elementsSection.append(createCard(data)));
  })
  .catch(err => {
    console.log(err)
  });

