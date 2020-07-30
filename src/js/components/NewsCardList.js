import Component from './BaseComponent';

export default class NewsCardList extends Component {
  constructor(createCardNewsElement, ...args) {
    super(...args);
    this.createCardNewsElement = createCardNewsElement;
    this.renderResults = this.renderResults.bind(this);
    this.renderSavedNewsCards = this.renderSavedNewsCards.bind(this);
    this.showMore = this.showMore.bind(this);
    this.addCard = this.addCard.bind(this);
    this._reset = this._reset.bind(this);
  }

  renderResults(res, keyword) {
    this._reset();
    const container = document.querySelector('.search-results__articles');
    const showMoreButton = document.querySelector('.search-results__button');
    this.articlesArr = [...res.articles];

    if (res.articles.length === 0) {
      this.renderError();
      return
    }
    document.querySelector('.search-results').style.display = 'flex';
    this.articlesArr.slice(0, 3).forEach(item => {
      container.appendChild(this.addCard(item, keyword));
    });
    if (res.articles.length > 3) {
      showMoreButton.style.display = 'block';
      showMoreButton.addEventListener('click', () => {
        this.showMore();
      });
    }
  }

  renderSavedNewsCards(res) {
    const container = document.querySelector('.search-results__articles');
    const showMoreButton = document.querySelector('.search-results__button');
    this.articlesArr = [...res.data];
    if (res.data.length === 0) {
      this.renderError();
      return
    }
    document.querySelector('.search-results').style.display = 'flex';
    this.articlesArr.slice(0, 3).forEach(item => {

      container.appendChild(this.loadCard(item));
    });
    if (res.data.length > 3) {
      showMoreButton.style.display = 'block';
      showMoreButton.addEventListener('click', () => {
        const container = document.querySelector('.search-results__articles');
        const articles = document.querySelectorAll('.article');
        const additionalArticles = this.articlesArr.slice((Array.from(articles).length), (Array.from(articles).length + 3));
        if (this.articlesArr.length == Array.from(articles).length) {
          document.querySelector('.search-results__button').style.display = 'none';
        }
        additionalArticles.forEach(item => container.appendChild(this.loadCard(item)))


      });
    }

  }


  renderError() {
    document.querySelector('.search-results').style.display = 'none';
    document.querySelector('.search-results__button').style.display = 'none';
    document.querySelector('.not-found').style.display = 'flex';
  }

  showMore() {
    const container = document.querySelector('.search-results__articles');
    const articles = document.querySelectorAll('.article');
    const additionalArticles = this.articlesArr.slice((Array.from(articles).length), (Array.from(articles).length + 3));
    additionalArticles.forEach(item => container.appendChild(this.addCard(item)));
    if (this.articlesArr.length == Array.from(articles).length) {
      document.querySelector('.search-results__button').style.display = 'none';
    }

  }

  addCard(newsCardData, keyword) {
    const articleCard = this.createCardNewsElement(newsCardData, keyword);
    const articleCardElement = articleCard.createNewsCard();
    return articleCardElement
  }

  loadCard(newsCardData) {
    const articleCard = this.createCardNewsElement(newsCardData);
    const articleCardElement = articleCard.createSavedNewsCard();
    articleCard.deleteIcon.addEventListener('click', () => {
      articleCard.delete();
      articleCardElement.parentNode.removeChild(articleCardElement);
    })
    return articleCardElement
  }

  _reset() {
    this.articlesArr = [];
    this.keyword = undefined;
    document.querySelector('.not-found').style.display = 'none';
    const showMoreButton = document.querySelector('.search-results__button');
    showMoreButton.removeEventListener('click', () => {
      this.showMore();
    });
    const articles = document.querySelectorAll('.article');
    Array.from(articles).forEach(item => item.parentNode.removeChild(item));
  }

}