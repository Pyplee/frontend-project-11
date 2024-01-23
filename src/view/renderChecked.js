export default (arrWithId) => {
  const arrWithElements = arrWithId.map((id) => document.querySelector(`a[data-id='${id}']`));
  arrWithElements.forEach((el) => {
    el.classList.replace('fw-bold', 'fw-normal');
  });
};
