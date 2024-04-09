import './styles.scss';
import 'bootstrap';
import app from './app.js';
import { initAndGetLng, renderLanguage } from './locales/i18n.js';

const elsDOM = {
  divFeeds: document.querySelector('.feeds'),
  divPosts: document.querySelector('.posts'),
  title: document.querySelector('h1'),
  titleDesc: document.querySelector('p.lead'),
  inputDesc: document.querySelector('label[for="url-input"]'),
  example: document.querySelector('.text-muted'),
  textInfo: document.querySelector('.text-danger'),
  button: document.querySelector('button.btn-primary'),
  input: document.querySelector('#url-input'),
};

const langInstance = await initAndGetLng();
renderLanguage(langInstance, elsDOM);
app(elsDOM, langInstance);

export { elsDOM, langInstance };
