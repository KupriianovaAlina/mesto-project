const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16/',
    headers: {
        authorization: '90c506b7-d892-431a-a44c-210a32f77305',
        'Content-Type': 'application/json'
    }
}

function checkRes(res) {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

// обновляем данные о пользователе на сервере
export function patchUser(params) {
    return fetch(`${config.baseUrl}users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: params
    }).then(checkRes);
}

// функция загрузки новой карточки на сервер
export function uploadCard(params) {
    return fetch(`${config.baseUrl}cards`, {
        method: 'POST',
        headers: config.headers,
        body: params
    }).then(checkRes);
}

export function updateAvatar(params) {
    return fetch(`${config.baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: params
    }).then(checkRes);
}

export function getProfile() {
    return fetch(`${config.baseUrl}users/me`, {
        method: 'GET',
        headers: config.headers
    }).then(checkRes);
}

export function getCards() {
    return fetch(`${config.baseUrl}cards`, {
        method: 'GET',
        headers: config.headers
    }).then(checkRes);
}

export function deleteLike(id) {
    return fetch(`${config.baseUrl}cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(checkRes);
}

export function addLike(id) {
    return fetch(`${config.baseUrl}cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    }).then(checkRes);
}

export function deleteCard(id) {
    return fetch(`${config.baseUrl}cards/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(checkRes);
}