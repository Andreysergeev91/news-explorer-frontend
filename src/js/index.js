import "../pages/index.css";

import Popup from './components/Popup';
import Form from './components/Form';
import NewsCard from './components/NewsCard';
import NewsCardList from './components/NewsCardList';
import MainApi from "./api/MainApi";
import NewsApi from "./api/NewsApi";
import Header from "./components/Header";
import renderPreloader from "./utils/renderPreloader";
const isDev = NODE_ENV === 'development';



const popupSignup = new Popup(document.querySelector('.popup-signup'));
const popupSignin = new Popup(document.querySelector('.popup-signin'));
const popupSucessfulReg = new Popup(document.querySelector('.popup-succesful-registration'));
const popupMobileNavMenu = new Popup(document.querySelector('.popup-mobile-nav-menu'));
const formSignin = new Form(document.querySelector('.popup__form-signin'));
const formSignup = new Form(document.querySelector('.popup__form-signup'));
const mainForm = document.querySelector('.main__form');
const mainApi = new MainApi();
const header = new Header(document.querySelector('.header'));

const buttonAuthorize = document.querySelector('.header__button_type_not-authorized');
const mobileMenuButtonOpen = document.querySelector('.header__nav-button-mobile');
const mobileButtonAuthorize = document.querySelector('.popup-mobile-nav-menu__button_type_not-authorized');
const buttonsSignOut = Array.from(document.querySelectorAll('.header__button_type_authorized'));

const createNewsCardElement = (newsCardData, keyWord = '') => {
  return new NewsCard(newsCardData, keyWord, mainApi);
};

const newCardListElement = new NewsCardList(createNewsCardElement);

function authorization() {
  return mainApi.getUserData().then(res => {
    const props = {};
    props.userName = res.data.name;
    props.isLoggedIn = true;
    header.render(props);
    sessionStorage.setItem(name, res.data.name);

  }).catch(err => console.log(err));

}



authorization();




popupSignin.bottomLink(popupSignup);
popupSignup.bottomLink(popupSignin);
popupSucessfulReg.bottomLink(popupSignin);


buttonAuthorize.addEventListener('click', function () {

  popupSignup.openPopup();

});

mobileButtonAuthorize.addEventListener('click', function () {

  popupMobileNavMenu.closePopup();
  popupSignup.openPopup();

});

mobileMenuButtonOpen.addEventListener('click', function () {

  popupMobileNavMenu.openPopup();

});

formSignup.domElement.addEventListener('submit', () => {
  event.preventDefault();
  const inputName = formSignup.domElement.elements.name;
  const inputPassword = formSignup.domElement.elements.password;
  const inputEmail = formSignup.domElement.elements.email;


  mainApi.signup(inputName.value, inputEmail.value, inputPassword.value).then((res) => {
    popupSignup.closePopup();
    formSignup.domElement.reset();
    popupSucessfulReg.openPopup();
  }).catch((err) => {
    if (err === 'Ошибка: 400') {
      formSignup.setServerError('Адрес электронной почты введен некорректно');
    }
    if (err === 'Ошибка: 500') {
      formSignup.setServerError('Такой пользователь уже есть');
    }
  });
});

formSignin.domElement.addEventListener('submit', () => {
  event.preventDefault();
  const inputPassword = formSignin.domElement.elements.password;
  const inputEmail = formSignin.domElement.elements.email;
  mainApi.signin(inputEmail.value, inputPassword.value).then((res) => {
    authorization();

    popupSignin.closePopup();
    formSignin.domElement.reset();
  }).catch((err) => {
    if (err === 'Ошибка: 401') {
      formSignin.setServerError('Неправильные почта или пароль');
    }
    if (err === 'Ошибка: 500') {
      formSignin.setServerError('Произошла ошибка, попробуйте снова');
    }
  });

});


mainForm.addEventListener('submit', () => {
  event.preventDefault();
  renderPreloader(true);
  const newsApi = new NewsApi(document.querySelector('.main__input').value, isDev);
  newsApi.getNews().then((res) => {

    newCardListElement.renderResults(res, mainForm.elements.search.value);

  }).catch(err => console.log(err)).finally(()=>renderPreloader(false));
});

buttonsSignOut.forEach(item => {
  item.addEventListener('click', () => {
    sessionStorage.clear();
    mainApi.signOut().catch(err => console.log(res));
    setTimeout(() => {
      document.location.reload(true);
    }, 1000);
  });
});