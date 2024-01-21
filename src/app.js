import _ from 'lodash';
import validateUrl from './utils/validate.js';
import initView from './view/view.js';
import fetch from './utils/fetch.js';
import parse from './utils/parse.js';

const globalState = {
  rssForm: {
    error: null,
    valid: null,
  },
  rss: {
    channels: [],
  },
};

function getUrlList() {
  const { channels } = globalState.rss;
  if (!channels.length) {
    return [];
  }
  const result = channels.map((feed) => feed.url);
  return result;
}

const app = (elsDOM, i18n) => {
  const watchedState = initView(globalState, elsDOM, i18n);

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validateUrl(url, getUrlList(), i18n)
      .then(() => {
        watchedState.rssForm.error = null;
        watchedState.rssForm.valid = true;
        const valueInput = elsDOM.input.value;
        return fetch(valueInput);
        // return { data: '12345' };
      })
      .then((response) => response.data)
      .then((data) => parse(data.contents, data.status.url))
      .then((data) => {
        data.items.forEach((item) => {
          item.id = _.uniqueId();
        });
        const oldChannels = globalState.rss.channels;
        watchedState.rss.channels = [...oldChannels, data];
        console.log(globalState.rss);
      })
      .catch((err) => {
        watchedState.rssForm.error = err.message;
        watchedState.rssForm.valid = false;
      });
  });
};

export default app;
