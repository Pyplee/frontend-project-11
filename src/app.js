import initView from './view/view.js';
import mainFunc from './utils/main.js';
import { clearUpdate } from './utils/update.js';

const globalState = {
  rssForm: {
    error: null,
    valid: null,
  },
  rss: {
    channels: [],
    checked: [],
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
    clearUpdate();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    mainFunc(url, getUrlList, i18n, watchedState, globalState, elsDOM);
  });
};

export default app;
