import _ from 'lodash';
import validateUrl from './utils/validate.js';
import initView from './view/view.js';
import fetch from './utils/fetch.js';
import parse from './utils/parse.js';
import renderChecked from './view/renderChecked.js';

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

let timeoutID;

function initEventButton(watchedState) {
  const myModal = document.querySelector('#modal');
  const btnForModal = document.querySelectorAll('[data-bs-toggle="modal"]');

  btnForModal.forEach((btnM) => {
    btnM.addEventListener('click', (el) => {
      const btn = el.target;
      const { id } = btn.dataset;
      const allPosts = globalState.rss.channels.map((channel) => channel.items).flat();
      const post = allPosts.find((item) => item.id === id);
      const titleModal = myModal.querySelector('h5');
      const descModal = myModal.querySelector('.text-break');
      const linkModal = myModal.querySelector('a');
      linkModal.href = post.link;
      titleModal.textContent = post.title;
      descModal.textContent = post.description;
      watchedState.rss.checked.push(id);
    });
  });
}

async function updateData(watchedState) {
  try {
    let checkNewData = false;
    const oldData = globalState.rss.channels;
    const contentPromises = oldData.map((channel) => fetch(channel.url));
    const contents = await Promise.all(contentPromises);
    const newData = contents.map((response) => {
      const { data } = response;
      return parse(data.contents, data.status.url);
    });
    const result = oldData.map((oldChannel, index) => {
      const { items } = oldChannel;
      const oldTitles = items.map((obj) => obj.title);
      const newChannel = newData[index];
      const newItems = newChannel.items;
      const itemDifferences = newItems.filter((el) => {
        const { title } = el;
        return !oldTitles.includes(title);
      });
      if (itemDifferences.length) {
        checkNewData = true;
        const channelWithDifferences = oldChannel;
        const itemDifferencesWithId = itemDifferences.map((obj) => {
          obj.id = _.uniqueId();
          return obj;
        });
        channelWithDifferences.items = [...itemDifferencesWithId, ...items];
        return channelWithDifferences;
      }
      return oldChannel;
    });
    if (checkNewData) {
      watchedState.rss.channels = result;
      initEventButton(watchedState);
      renderChecked(globalState.rss.checked);
    }
    timeoutID = window.setTimeout(() => {
      updateData(watchedState);
    }, 5000);
  } catch (err) {
    console.log(err);
    timeoutID = window.setTimeout(() => {
      updateData(watchedState);
    }, 5000);
  }
}

function delayedUpdate(watchedState) {
  timeoutID = window.setTimeout(() => {
    updateData(watchedState);
  }, 5000);
}

function clearUpdate() {
  window.clearTimeout(timeoutID);
}

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
        initEventButton(watchedState);
        renderChecked(globalState.rss.checked);
        delayedUpdate(watchedState);
      })
      .catch((err) => {
        watchedState.rssForm.error = err.message;
        watchedState.rssForm.valid = false;
      });
  });
};

export default app;
