import Component from './BaseComponent';

export default class Popup extends Component {

  constructor(...args) {
    super(...args);

    this.openPopup = this.openPopup.bind(this);

    this.closePopup = this.closePopup.bind(this);
    this.bottomLink = this.bottomLink.bind(this);
    this.domElement.querySelector('.popup__close').addEventListener('click', this.closePopup);

  }



  openPopup() {
   this.domElement.classList.add('popup_type_opened');
  }


  closePopup() {
    this.domElement.classList.remove('popup_type_opened');
  }

  bottomLink(popupElement) {
    if (this.domElement.querySelector('.popup__bottom-link_theme_blue')) {
      this.domElement.querySelector('.popup__bottom-link_theme_blue').addEventListener('click', () => {
        this.closePopup();
        popupElement.openPopup();
      });
    }
  }



}