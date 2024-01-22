export default (channels, elsDOM) => {
  const feeds = channels.map((el) => ({
    title: el.title,
    description: el.description,
  }));
  const tempPosts = [];
  channels.forEach((el) => tempPosts.push(el.items));
  const posts = tempPosts.flat();
  const initContainers = (elF, titleEl) => {
    const card = document.createElement('div');
    card.classList.add('card', 'border-0');

    const cardBody = document.createElement('div');
    const h2 = document.createElement('h2');
    cardBody.classList.add('card-body');
    h2.classList.add('card-title', 'h4');
    h2.textContent = titleEl;

    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0');

    elF.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(h2);
    card.appendChild(ul);
  };

  if (elsDOM.divFeeds.childNodes.length === 0) {
    initContainers(elsDOM.divFeeds, 'Фиды');
    initContainers(elsDOM.divPosts, 'Посты');
  }

  const contListFeeds = elsDOM.divFeeds.querySelector('ul');
  contListFeeds.innerHTML = '';
  const contListPosts = elsDOM.divPosts.querySelector('ul');
  contListPosts.innerHTML = '';

  feeds.forEach((el) => {
    const containerfeed = document.createElement('li');
    containerfeed.classList.add('list-group-item', 'border-0', 'border-end-0');

    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = el.title;

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = el.description;

    containerfeed.appendChild(h3);
    containerfeed.appendChild(p);
    contListFeeds.appendChild(containerfeed);
  });

  posts.forEach((el) => {
    const containerfeed = document.createElement('li');
    containerfeed.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const a = document.createElement('a');
    a.classList.add('fw-bold');
    a.setAttribute('href', el.link);
    a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('target', '_blank');
    a.dataset.id = el.id;
    a.textContent = el.title;

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.dataset.id = el.id;
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#modal';
    button.textContent = 'Просмотр';

    containerfeed.appendChild(a);
    containerfeed.appendChild(button);
    contListPosts.appendChild(containerfeed);
  });
};
