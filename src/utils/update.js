import _ from 'lodash';
import fetch from './fetch.js';
import parse from './parse.js';
import initEventButton from './events.js';
import renderChecked from '../view/renderChecked.js';

let timeoutID;

function clearUpdate() {
  window.clearTimeout(timeoutID);
}

async function updateData(watchedState, globalState) {
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
      updateData(watchedState, globalState);
    }, 5000);
  } catch (err) {
    console.log(err);
    timeoutID = window.setTimeout(() => {
      updateData(watchedState, globalState);
    }, 5000);
  }
}

function delayedUpdate(watchedState, globalState) {
  timeoutID = window.setTimeout(() => {
    updateData(watchedState, globalState);
  }, 5000);
}

export { delayedUpdate, clearUpdate };
