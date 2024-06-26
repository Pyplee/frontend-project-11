import onChange from 'on-change';
import renderStatus from './renderStatus.js';
import renderData from './renderData.js';
import renderChecked from './renderChecked.js';

export default (state, elsDOM, lngInst) => onChange(state, (path, value) => {
  switch (path) {
    case 'rssForm.error':
      renderStatus(value, elsDOM, lngInst);
      break;
    case 'rssForm.valid':
      if (!value) {
        elsDOM.input.classList.add('is-invalid');
      } else {
        elsDOM.input.classList.remove('is-invalid');
      }
      break;
    case 'rss.channels':
      renderData(value, elsDOM, lngInst);
      renderStatus('RSS successfully uploaded', elsDOM, lngInst);
      elsDOM.input.value = '';
      break;
    case 'rss.checked':
      renderChecked(value);
      break;
    default:
      throw new Error('Path error in view (view.js -> default on case)');
  }
});
