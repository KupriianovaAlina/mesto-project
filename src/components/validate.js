import { regex } from "./constants.js";
import { formClasses } from "./constants.js";

// Функция, которая добовляет класс с ошибкой
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(`${formClasses.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${formClasses.errorClass}`);
};

// Функция, которая удаляет класс с ошибкой
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(`${formClasses.inputErrorClass}`);
    errorElement.textContent = '';
    errorElement.classList.remove(`${formClasses.errorClass}`);
};

// Функция, которая проверяет валидность поля
export function isValid(formElement, inputElement) {

    regex.lastIndex = 0;

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else if (inputElement.dataset.regex && !regex.test(inputElement.value)) {
        showInputError(formElement, inputElement, inputElement.dataset.customError);
    } else {
        hideInputError(formElement, inputElement);
    }
};

// Функция принимает массив полей и проверяет, есть ли среди них хоть одно невалидное поле
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true
        const hasError = inputElement.classList.contains(`${formClasses.inputErrorClass}`) || (inputElement.value === "")
        return hasError;
    })
};

// Функция принимает массив полей ввода и кнопку, состояние которой надо менять
export function toggleButtonState(inputList, buttonElement) {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.disabled = true;
        buttonElement.classList.add(`${formClasses.inactiveButtonClass}`);
    } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
        buttonElement.classList.remove(`${formClasses.inactiveButtonClass}`);
    }
};

//находим все input'ы внутри некой формы и вешаем на них обработчики типа input
function setEventListenersOnInputs(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(`${formClasses.inputSelector}`));
    const buttonElement = formElement.querySelector(`${formClasses.submitButtonSelector}`);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

// находим все формы и поочередно передаем каждую в setEventListeners()
export function enableValidation() {
    //найдем все формы в DOM
    const formList = Array.from(document.querySelectorAll(`${formClasses.formSelector}`));

    formList.forEach((formElement) => {
        setEventListenersOnInputs(formElement);
    });
};  