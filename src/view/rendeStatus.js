export default (elsDOM) => {
  elsDOM.textInfo.classList.remove('text-danger');
  elsDOM.textInfo.classList.add('text-success');
  elsDOM.textInfo.textContent = 'RSS успешно загружен';
};
