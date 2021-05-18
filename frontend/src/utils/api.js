class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject("Error!" + res.statusText);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then(this._checkResponse);
  }
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject("Error!" + res.statusText);
  }

  //GET https://around.nomoreparties.co/v1/groupId/users/me
  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then(this._checkResponse);
  }
  getAllInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  //PATCH https://around.nomoreparties.co/v1/groupId/users/me
  setUserInfo({ name, about }) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }
  //POST https://around.nomoreparties.co/v1/groupId/cards
  addCard({ name, link }) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }
  removeCard(cardId) {
    //fetch cards + cardid
    return fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  //PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  setAvatar({ avatar }) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }
  // PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  // DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  changeLikeCardStatus(cardId, like) {
    //PUT AND DELETE
    const whichMethod = like ? "DELETE" : "PUT";
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      method: whichMethod,
      headers: this._headers,
    }).then(this._checkResponse);
  }
}
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-8",
  headers: {
    authorization: "d687320c-42a6-463a-9f18-8c281b207460",
    "Content-Type": "application/json",
  },
});

export default api;
