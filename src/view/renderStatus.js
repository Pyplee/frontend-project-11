export default (message, elsDOM) => {
  if (message === null) {
    elsDOM.textInfo.classList.remove('text-danger');
    elsDOM.textInfo.textContent = '';
  } else if (message === 'RSS успешно загружен') {
    elsDOM.textInfo.classList.remove('text-danger');
    elsDOM.textInfo.classList.add('text-success');
    elsDOM.textInfo.textContent = message;
  } else {
    elsDOM.textInfo.classList.add('text-danger');
    elsDOM.textInfo.textContent = message;
  }
};
