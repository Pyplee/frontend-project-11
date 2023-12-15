export default (response) => {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(response, 'application/xml');
  const errorNode = parser.querySelector('parsererror');
  if (errorNode) {
    console.log('parse error ??');
    return null;
  }
  const channel = parsed.documentElement.children[0];
  const coll = [...channel.children];
  const [title, description] = coll;
  const fids = [{ title, description }];
  const posts = [];
  coll.forEach((el) => {
    if (el.tagName === 'item') {
      const [tl, , link, desc] = [...el.children];
      posts.push({ title: tl, link, description: desc });
    }
  });
  return [fids, posts];
};
