export default (response) => {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(response, 'application/xml');
  const channel = parsed.documentElement.children[0];
  const coll = [...channel.children];
  const [title, description] = coll;
  const feeds = [{ title: title.textContent, description: description.textContent }];
  const posts = [];
  coll.forEach((el) => {
    if (el.tagName === 'item') {
      const [tl, , link, desc] = [...el.children];
      posts.push({ title: tl.textContent, link: link.textContent, description: desc.textContent });
    }
  });
  return [feeds, posts];
};
