import validateUrl from './utils/validate.js';
import initView from './view/view.js';

const globalState = {
  rssForm: {
    error: null,
    valid: null,
  },
};

const app = (elsDOM, i18n) => {
  const watchedState = initView(globalState, elsDOM);

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validateUrl(url, i18n)
      .then((response) => {
        console.log(response);
        watchedState.rssForm.error = null;
        watchedState.rssForm.valid = true;
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
        watchedState.rssForm.error = err.message;
        watchedState.rssForm.valid = false;
      });
  });
};

export default app;
