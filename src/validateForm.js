import * as yup from 'yup';

const input = document.querySelector('#url-input');
const textInfo = document.querySelector('.feedback');
const buttonSend = document.querySelector('.col-auto>.btn-primary');
const stateElements = {
  input,
  buttonSend,
};

const schema = yup.object({
  url: yup.string().url(),
});

function renderInvalid(value) {
  textInfo.classList.add('text-danger');
  if (value) {
    input.classList.remove('is-invalid');
    textInfo.textContent = '';
  } else {
    input.classList.add('is-invalid');
    textInfo.textContent = 'Ссылка должна быть валидным URL';
  }
}

async function validUrl(url, watchedStateValid) {
  const result = await schema.isValid({ url });
  watchedStateValid.valid = result;
}

export { renderInvalid, validUrl, stateElements };
