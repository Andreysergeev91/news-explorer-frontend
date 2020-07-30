import Component from './BaseComponent';
import {converter} from '../utils/monthConverter';

export default class NewsCard extends Component {
  constructor(newsCardData, keyWord, apiElement, ...args) {
    super(...args);
    this.newsCardData = newsCardData;
    this.keyWord = keyWord;
    this.apiElement = apiElement;
    this.saved = false;
  }

  createNewsCard() {

    const articleCard = document.createElement("div");
    articleCard.classList.add("article");
    articleCard.insertAdjacentHTML('beforeend', `
<button class="article__save-icon"></button>
  <div></div>
<a href="#" class="article__link">
<div class="article__image">
  </div>
<div class="article__description">
  <p class="article__date"></p>
  <p class="article__title"></p>
  <p class="article__text"></p>
  <p class="article__source"></p>
</div>
</a>
`);
    articleCard.querySelector(".article__date").textContent = converter(this.newsCardData.publishedAt);
    articleCard.querySelector(".article__title").textContent = this.newsCardData.title;
    articleCard.querySelector(".article__text").textContent = this.newsCardData.description;
    articleCard.querySelector(".article__source").textContent = this.newsCardData.source.name;
    articleCard.querySelector(".article__link").href = this.newsCardData.url;
    articleCard.querySelector(".article__image").style.backgroundImage = `url(${this.newsCardData.urlToImage})`;

    if (sessionStorage.getItem(name)) {
      articleCard.querySelector('button').classList.remove('article__save-icon');
      articleCard.querySelector('button').classList.add('article__save-icon-authorized');
      articleCard.querySelector('.article__save-icon-authorized').addEventListener('click', () => {
        articleCard.querySelector('.article__save-icon-authorized').style.backgroundImage = 'url(./images/marked.svg)';
        if (!(this.saved)) {
          this.saved = true;
          this.apiElement.createArticle(this.newsCardData, this.keyWord).then(res => this._id = res.data._id).catch(err => console.log(err));
        } else {
          this.saved = false;
          articleCard.querySelector('.article__save-icon-authorized').style.backgroundImage = 'url(./images/normal.svg)';
          this.apiElement.removeArticle(this._id);
        }

      })
    }

    return articleCard;

  }

  createSavedNewsCard() {
    const articleCard = document.createElement("div");
    articleCard.classList.add("article");
    articleCard.insertAdjacentHTML('beforeend', `
     <div class="article__delete-icon"><img class="article__delete-icon-image" src="./images/trash.svg" alt="">
      <div></div>
      </div>
      <a href="#" class="article__link">
    <div class="article__image"></div>
      <p class="article__tag"></p>
      <div class="article__description">
      <p class="article__date"></p>
      <p class="article__title"></p>
      <p class="article__text"></p>
      <p class="article__source"></p>
    </div>
    </a>
  `);

    articleCard.querySelector(".article__date").textContent = this.newsCardData.date;
    articleCard.querySelector(".article__title").textContent = this.newsCardData.title;
    articleCard.querySelector(".article__text").textContent = this.newsCardData.text;
    articleCard.querySelector(".article__tag").textContent = this.newsCardData.keyword;
    articleCard.querySelector(".article__source").textContent = this.newsCardData.source;
    articleCard.querySelector(".article__link").href = this.newsCardData.link;
    articleCard.querySelector(".article__image").style.backgroundImage = `url(${this.newsCardData.image})`;
    this._id = this.newsCardData._id;
    this.deleteIcon = articleCard.querySelector(".article__delete-icon");


    return articleCard;
  }

 delete() {
  this.apiElement.removeArticle(this._id);
 }

}