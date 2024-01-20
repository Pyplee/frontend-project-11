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
  data: {
    feeds: [],
    posts: [],
  },
};

function getUrlList() {
  const { feeds } = globalState.data;
  if (!feeds.length) {
    return [];
  }
  const result = feeds.map((feed) => feed.url);
  return result;
}

const app = (elsDOM, i18n) => {
  const watchedState = initView(globalState, elsDOM);

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
        const [feeds, posts] = data;
        feeds[0].id = _.uniqueId();
        posts.forEach((item) => {
          item.id = _.uniqueId();
        });
        const otherFeeds = globalState.data.feeds;
        const otherPosts = globalState.data.posts;
        watchedState.data = {
          feeds: [...otherFeeds, ...feeds],
          posts: [...otherPosts, ...posts],
        };
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          watchedState.rssForm.error = i18n.t('meassages.networkError');
        } else {
          watchedState.rssForm.error = err.message;
          watchedState.rssForm.valid = false;
        }
      });
  });
};

export default app;
