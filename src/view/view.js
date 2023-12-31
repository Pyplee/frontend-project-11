import onChange from 'on-change';
import renderError from './renderError.js';
import renderData from './renderData.js';

export default (state, elsDOM, lngInst) => onChange(state, (path, value) => {
  console.log('path->', path);
  switch (path) {
    case 'rssForm.error':
      renderError(value, elsDOM, lngInst);
      break;
    case 'rssForm.valid':
      if (!value) {
        elsDOM.input.classList.add('is-invalid');
      } else {
        elsDOM.input.classList.remove('is-invalid');
      }
      break;
    case 'data':
      renderData(value, elsDOM);
      break;
    default:
      alert('Нет таких значений');
  }
});
