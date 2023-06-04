export default class NewsApi {
  constructor(keyWord, isDev) {
    this.keyWord = keyWord;
    this.baseUrl = isDev ? 'https://newsapi.org/v2/everything' : 'https://praktikum.tk/news/v2/everything';
    this.apiKey = 'c4513ed2f78f4a32a99225ac72193153';
    this.dateNow = this._dateNow();
    this.dateWeekAgo = this._dateWeekAgo();

  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getNews() {

    return fetch(`${this.baseUrl}?q=${this.keyWord}&from=${this.dateWeekAgo}&to=${this.dateNow}&pageSize=100&apiKey=${this.apiKey}`, {
        method: 'GET',
      })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  _dateNow() {
    const date = new Date();

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  }

  _dateWeekAgo() {
    const date = new Date();

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() - 7);

  }
}