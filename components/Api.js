export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'GET',
    headers: this._headers})
      .then(res => this._getResponseData(res));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
    method: 'GET',
    headers: this._headers})
    .then(this._getResponseData);
  }

  setUserData(body) {
    const config = Object.assign({body: JSON.stringify(body), 
    method: 'PATCH', 
    headers: this._headers});
    return fetch(`${this._baseUrl}/users/me`, config)
      .then(res => this._getResponseData(res));
  }

  addNewCard(body) {
    const config = Object.assign({body: JSON.stringify(body),
       method: 'POST', 
       headers: this._headers});
    return fetch(`${this._baseUrl}/users/me`, config)
      .then(res => this._getResponseData(res));
  }

  deleteCard(id) {
    const config = Object.assign({method: 'DELETE', 
    headers: this._headers});
    return fetch(`${this._baseUrl}/cards${id}`, config)
      .then(res => this._getResponseData(res));
  }

  likeCard(id) {
    const config = Object.assign({method: 'PUT',
    headers: this._headers});
    return fetch(`${this._baseUrl}/cards/like${id}`, config)
      .then(res => this._getResponseData(res));
  }

  dislikeCard(id) {
    const config = Object.assign({method: 'DELETE', 
    headers: this._headers});
    return fetch(`${this._baseUrl}/cards/like${id}`, config)
      .then(res => this._getResponseData(res));
  }

  setNewAvatar(body) {
    const config = Object.assign({body: JSON.stringify(body), method: 'PATCH', 
    headers: this._headers});
    return fetch(`${this._baseUrl}/users/me/avatar`, config)
      .then(res => this._getResponseData(res));
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    } 
    return res.json();
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: 'b728ad0c-8a51-4521-be05-924ef3deb392',
    'Content-Type': 'application/json'
  }
}); 