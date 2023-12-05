import i18n from 'i18next';
import ru from './ru.js';
import en from './en.js';

const resources = {
  ru,
  en,
};

const elsTranslate = {
  title: document.querySelector('h1'),
  descTitle: document.querySelector('.lead'),
  descInput: document.querySelector('div.form-floating label'),
  example: document.querySelector('.text-muted'),
  button: document.querySelector('.col-auto>.btn-primary'),
};

function renderLanguage(langInstance) {
  elsTranslate.title.textContent = langInstance.t('title');
  elsTranslate.descTitle.textContent = langInstance.t('descTitle');
  elsTranslate.descInput.textContent = langInstance.t('descInput');
  elsTranslate.example.textContent = langInstance.t('example');
  elsTranslate.button.textContent = langInstance.t('button');
}

const runApp = async () => {
  const i18nextInstance = i18n.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  renderLanguage(i18nextInstance);
};

export default runApp;
