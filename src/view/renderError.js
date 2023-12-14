export default (message, elsDOM) => {
  if (message === null) {
    elsDOM.textInfo.classList.remove('text-danger');
    elsDOM.textInfo.textContent = '';
  } else {
    elsDOM.textInfo.classList.add('text-danger');
    elsDOM.textInfo.textContent = message;
  }
};
