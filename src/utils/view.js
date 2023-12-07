import onChange from 'on-change';
import validateUrl from './validate.js';

const state = {
  validStatus: {
    valid: null,
  },
  InputValue: {
    value: '',
  },
};
// const input = document.getElementById('url-input'); !MOVE
const watchedStateInput = onChange(state.InputValue, validateUrl);

// watchedStateInput.value = e.target.value;

export default init;
