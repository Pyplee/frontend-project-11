export default (message, elsDOM, i18n) => {
  elsDOM.textInfo.classList.remove('text-success');
  elsDOM.textInfo.classList.add('text-danger');
  elsDOM.textInfo.textContent = '';
  if (message === 'Network Error') {
    elsDOM.textInfo.textContent = i18n.t('meassages.networkError');
  } else if (message === 'RSS successfully uploaded') {
    elsDOM.textInfo.classList.remove('text-danger');
    elsDOM.textInfo.classList.add('text-success');
    elsDOM.textInfo.textContent = i18n.t('meassages.success');
  } else if (message === 'The resource does not contain valid RSS') {
    elsDOM.textInfo.textContent = i18n.t('meassages.rssDoesNotContain');
  } else if (message === 'Parse Error') {
    elsDOM.textInfo.textContent = i18n.t('meassages.parseError');
  } else {
    elsDOM.textInfo.textContent = message;
  }
};
