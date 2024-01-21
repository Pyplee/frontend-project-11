export default (message, elsDOM, i18n) => {
  elsDOM.textInfo.classList.add('text-danger');
  elsDOM.textInfo.textContent = '';
  if (message === 'Network Error') {
    elsDOM.textInfo.textContent = i18n.t('meassages.networkError');
  } else if (message === 'RSS successfully uploaded') {
    elsDOM.textInfo.classList.remove('text-danger');
    elsDOM.textInfo.classList.add('text-success');
    elsDOM.textInfo.textContent = i18n.t('meassages.success');
  } else {
    elsDOM.textInfo.textContent = message;
  }
};
