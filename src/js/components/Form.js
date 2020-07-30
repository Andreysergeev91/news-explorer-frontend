import Component from './BaseComponent';
import {
  emailPattern
} from '../constants/emailRegExpPattern.js';

export default class Form extends Component {

  constructor(...args) {
    super(...args);
    this._validateInputElement = this._validateInputElement.bind(this);
    this.domElement.addEventListener('input', () => {
      this._validateForm();
    });
    Array.from(this.domElement.querySelectorAll('.popup__input')).forEach(item => item.addEventListener('input', () => {
      this._validateInputElement(item);
    }));

  }

  setServerError(string) {
    this.domElement.querySelector('.popup__input-error-message_type_user').textContent = string;
    this.domElement.querySelector('.popup__input-error-message_type_user').classList.add("error-message_type_active");
  }


  _validateInputElement(input) {
    const errorEmail = this.domElement.querySelector('.popup__input-error-message_type_email');
    const errorEmptyPassword = this.domElement.querySelector('.popup__input-error-message_type_password');
    const errorEmptyUserName = this.domElement.querySelector('.popup__input-error-message_type_name');

    if (input.type === "email") {
      if (!(emailPattern.test(input.value))) {
        errorEmail.classList.add("error-message_type_active");
        return false
      } else {
        errorEmail.classList.remove("error-message_type_active");
        return true
      }
    }
    if (input.type === "password") {
      if (input.validity.valueMissing) {
        errorEmptyPassword.classList.add("error-message_type_active");
        return false
      } else {
        errorEmptyPassword.classList.remove("error-message_type_active");
        return true
      }
    }
    if (input.type === "text") {
      if (input.validity.valueMissing) {
        errorEmptyUserName.classList.add("error-message_type_active");
        return false
      } else {
        errorEmptyUserName.classList.remove("error-message_type_active");
        return true
      }
    }


  }

  _validateForm() {
    const inputs = Array.from(this.domElement.querySelectorAll('.popup__input'));
    const button = this.domElement.querySelector('.popup__button');

    if (inputs.some((item) => (this._validateInputElement(item) == false) || item.validity.valueMissing)) {
      button.setAttribute('disabled', true);
      button.classList.add("button-inactive");
    } else {
      button.removeAttribute('disabled');
      button.classList.remove("button-inactive");
    }

  }


}