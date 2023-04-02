class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  //проверяем ответ с сервера
  _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получаем карточеки с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
  // Получаем информацию о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // Обновляем информацию о пользователе с сервера
  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.userName,
        about: data.userJob,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // Редактирование аватара пользователя
  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // Добавим новую карточку
  newCardElement(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // Удаление карточки
  deleteCard(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // Ставим лайк карточке
  setLikeCard(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // Удаляем лайк
  deleteLike(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

// api
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "b5e191e2-a9f1-4b65-96ec-0b7ea96da54a",
    "Content-Type": "application/json",
  },
});

export default api;