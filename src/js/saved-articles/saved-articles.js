import "../../pages/saved-articles.css";


import NewsCard from '../components/NewsCard';
import NewsCardList from '../components/NewsCardList';
import Popup from '../components/Popup';
import MainApi from "../api/MainApi";
import Header from "../components/Header";

const popupMobileNavMenu = new Popup(document.querySelector('.popup-mobile-nav-menu'));
const mobileButtonAuthorize = document.querySelector('.popup-mobile-nav-menu__button_type_not-authorized');


const mainApi = new MainApi();


const mobileMenuButtonOpen = document.querySelector('.header__nav-button-mobile');

const header = new Header(document.querySelector('.header'));
const buttonsSignOut = Array.from(document.querySelectorAll('.header__button_type_authorized'));

const createNewsCardElement = (newsCardData, keyWord = '') => {
  return new NewsCard(newsCardData, keyWord, mainApi);
};

const newCardListElement = new NewsCardList(createNewsCardElement);




if (!(sessionStorage.getItem(name))) {
  document.location.replace('../../index.html');
}


let props = {};
props.userName = sessionStorage.getItem(name);
props.isLoggedIn = true;
header.render(props);

mobileButtonAuthorize.addEventListener('click', function () {

  popupMobileNavMenu.closePopup();
  popupSignup.openPopup();

});

mobileMenuButtonOpen.addEventListener('click', function () {

  popupMobileNavMenu.openPopup();

});






mainApi.getArticles().then(res => {

  if (res.data.length > 0 && res.data.length === 3) {
    document.querySelector('.saved-news__quantity').textContent = `${sessionStorage.getItem(name)}, у вас ${res.data.length} сохранённые статьи`;
    document.querySelector('.saved-news__key-words').innerHTML = `По ключевым словам: <b>${res.data[0].keyword},</b>&nbsp;<b>${res.data[1].keyword}</b>&nbsp;и&nbsp;<b>${res.data[2].keyword}</b></p>`;
    newCardListElement.renderSavedNewsCards(res);
  } else if (res.data.length > 0 && res.data.length === 2) {
    document.querySelector('.saved-news__quantity').textContent = `${sessionStorage.getItem(name)}, у вас ${res.data.length} сохранённые статьи`;
    document.querySelector('.saved-news__key-words').innerHTML = `По ключевым словам: <b>${res.data[0].keyword},</b>&nbsp;и&nbsp;<b>${res.data[1].keyword}</b></p>`;
    newCardListElement.renderSavedNewsCards(res);
  } else if (res.data.length > 0 && res.data.length === 1) {
    document.querySelector('.saved-news__quantity').textContent = `${sessionStorage.getItem(name)}, у вас ${res.data.length} сохранённых статей`;
    document.querySelector('.saved-news__key-words').innerHTML = `По ключевыму слову: <b>${res.data[0].keyword}</b></p>`;
    newCardListElement.renderSavedNewsCards(res);
  } else if (res.data.length > 0 && res.data.length > 3) {
    document.querySelector('.saved-news__quantity').textContent = `${sessionStorage.getItem(name)}, у вас ${res.data.length} сохранённых статей`;
    document.querySelector('.saved-news__key-words').innerHTML = `По ключевым словам: <b>${res.data[0].keyword},</b>&nbsp;<b>${res.data[1].keyword}</b>&nbsp;и&nbsp;<b>${res.data.length - 2}другим</b></p>`;
    newCardListElement.renderSavedNewsCards(res);
  } else {
    document.querySelector('.saved-news__quantity').textContent = `${sessionStorage.getItem(name)}, у вас нет сохранённых статей`;
    newCardListElement.renderError();
  }

}).catch(err => console.log(err));




buttonsSignOut.forEach(item => {
  item.addEventListener('click', () => {
    mainApi.signOut().catch(() => console.log(res));
    sessionStorage.clear();
    setTimeout(() => {
      document.location.replace('../../index.html');
    }, 1000);
   });
});