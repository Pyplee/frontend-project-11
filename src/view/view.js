import onChange from 'on-change';
import renderResultValidation from './notPath';
// import elsDOM from '../index.js';
let elsDOM = {};

const globalState = {
  rssForm: {
    error: [],
    valid: null,
  },
};

function controlFunc(path) {
  console.log(elsDOM);
  let temp1;
  let temp2;
  switch (path) {
    case 'rssForm.valid':
      temp1 = globalState.rssForm.valid;
      temp2 = globalState.rssForm.error;
      renderResultValidation(elsDOM, temp1, temp2);
      break;
    case "Apples":
      console.log("Apples are $0.32 a pound.");
      break;
    case "Bananas":
      console.log("Bananas are $0.48 a pound.");
      break;
    case "Cherries":
      console.log("Cherries are $3.00 a pound.");
      break;
    case "Mangoes":
    case "Papayas":
      console.log("Mangoes and papayas are $2.79 a pound.");
      break;
    default:
      console.log('Oooops, something went wrong!');
  }
}

export default (els) => {
  elsDOM = els;
  return onChange(globalState, (path) => controlFunc(path))
};
