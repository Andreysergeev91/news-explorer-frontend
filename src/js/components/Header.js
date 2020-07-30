import Component from './BaseComponent';

export default class Header extends Component {
  constructor(...args){
    super(...args);

  }
  render(props) {
if (props.isLoggedIn) {
  Array.from(document.querySelectorAll('.user-name')).forEach(item => {
    item.textContent = props.userName;
  });
  Array.from(document.querySelectorAll('.header__link_type_saved-articles, .popup-mobile-nav-menu__link_type_saved-articles')).forEach(item => {
  item.style.display='block';
  });
  if (Array.from(document.querySelectorAll('.header__button_type_authorized'))) {
    Array.from(document.querySelectorAll('.header__button_type_authorized')).forEach(item => {
    item.style.display='flex';
    });
  }
  Array.from(document.querySelectorAll('.header__button_type_not-authorized')).forEach(item => {
    item.style.display='none';
  });
}

  }

}