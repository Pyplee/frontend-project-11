import i18n from 'i18next';
import en from './en.js';
import ru from './ru.js';

const defaultLanguage = 'en';
const resources = {
  en,
  ru,
};

const initAndGetLng = async () => {
  const i18nextInstance = i18n.createInstance();
  await i18nextInstance.init({
    lng: defaultLanguage,
    debug: true,
    resources,
  });
  return i18nextInstance;
};

function renderLanguage(lng, elsDOM) {
  elsDOM.title.textContent = lng.t('title');
  elsDOM.titleDesc.textContent = lng.t('titleDesc');
  elsDOM.inputDesc.textContent = lng.t('inputDesc');
  elsDOM.example.textContent = lng.t('example');
  elsDOM.button.textContent = lng.t('button');
}

// const state = {
//   language: defaultLanguage,
// };

// function changeLanguage(lng, elsDOM) {
//   const currLng = state.language;
//   lng.changeLanguage(currLng === 'en' ? 'en' : 'ru');
//   renderLanguage(lng, elsDOM);
// }

// delited export changeLanguage;
export { initAndGetLng, renderLanguage };
