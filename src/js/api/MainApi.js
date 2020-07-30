import {converter} from '../utils/monthConverter';

export default class MainApi {
  constructor() {
    this.baseUrl = 'https://www.api.news-explorer-app.ga';
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }


  signup(inputNameValue, inputEmailValue, inputPasswordValue) {
    return fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": inputNameValue,
          "email": inputEmailValue,
          "password": inputPasswordValue
        })
      })
      .then(res => {
        return this._getResponseData(res);
      })
  }


  signin(inputEmailValue, inputPasswordValue) {
    return fetch(`${this.baseUrl}/signin`, {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": inputEmailValue,
          "password": inputPasswordValue
        })
      })
      .then(res => {
        return this._getResponseData(res);
      })
  }


  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return this._getResponseData(res);
    })

  }

  signOut() {
    return fetch(`${this.baseUrl}/signout`, {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return this._getResponseData(res);
    })

  }


  getArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  createArticle(options, keyword) {
   const { title, description, publishedAt, source, url, urlToImage } = options;
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "keyword": keyword,
        "title": title,
        "text": description,
        "date": converter(publishedAt),
        "source": source.name,
        "link": url,
        "image": urlToImage,
      })
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  removeArticle(_id) {
    return fetch(`${this.baseUrl}/articles/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
      withCredentials: true,
  })
    .then(res => {
      return this._getResponseData(res);
    })
  }
}