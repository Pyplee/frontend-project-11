import _ from 'lodash';
import validateUrl from './validate.js';
import parse from './parse.js';
import renderChecked from '../view/renderChecked.js';
import fetch from './fetch.js';
import initEventButton from './events.js';
import { delayedUpdate, clearUpdate } from './update.js';

export default (url, getUrlList, i18n, watchedState, globalState, elsDOM) => {
  validateUrl(url, getUrlList(), i18n)
    .then(() => {
      watchedState.rssForm.error = null;
      watchedState.rssForm.valid = true;
      const valueInput = elsDOM.input.value;
      return fetch(valueInput);
    // return { data: { contents: '1234' } };
    })
    .then((response) => response.data)
    .then((data) => parse(data.contents, url))
    .then((data) => {
      if (!data.items.length) {
        throw new Error('The resource does not contain valid RSS');
      }
      data.items.forEach((item) => {
        item.id = _.uniqueId();
      });
      const oldChannels = globalState.rss.channels;
      watchedState.rss.channels = [...oldChannels, data];
      initEventButton(watchedState, globalState);
      renderChecked(globalState.rss.checked);
      delayedUpdate(watchedState, globalState);
    })
    .catch((err) => {
      if (globalState.rss.channels.length) {
        clearUpdate();
        delayedUpdate(watchedState, globalState);
      }
      watchedState.rssForm.error = err.message;
      watchedState.rssForm.valid = false;
    });
};
