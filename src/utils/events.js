export default (watchedState, globalState) => {
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
};
