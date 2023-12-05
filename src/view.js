import onChange from 'on-change';
import { validUrl, renderInvalid, stateElements } from './validateForm.js';

const { input, buttonSend } = stateElements;

const stateInput = {
  value: '',
};
const stateValid = {
  valid: null,
};

const watchedStateValid = onChange(stateValid, (path, value) => renderInvalid(value));

const wathcedStateInput = onChange(stateInput, () => {
  validUrl(stateInput.value, watchedStateValid);
});

const initValidateUrl = () => {
  buttonSend.addEventListener('click', (e) => {
    e.preventDefault();
    wathcedStateInput.value = input.value;
  });
};

export default initValidateUrl;
