import validateUrl from './utils/validate.js';
import initView from './view/view.js';
// const globalState = {
//   rssForm: {
//     error: null,
//     valid: null,
//   },
// };

const app = (elsDOM) => {
  const watchedState = initView(elsDOM);

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validateUrl(url)
      .then(() => {
        watchedState.rssForm.valid = true;
      })
      .catch(() => {
        watchedState.rssForm.valid = false;
      });
  });
};

export default app;
