export default (response, url) => {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(response, 'application/xml');
  const channel = parsed.documentElement.children[0];
  const coll = [...channel.children];
  const [title, description] = coll;
  const items = [];
  coll.forEach((el) => {
    if (el.tagName === 'item') {
      const [tl, , link, desc] = [...el.children];
      items.push({ title: tl.textContent, link: link.textContent, description: desc.textContent });
    }
  });
  return {
    title: title.textContent,
    description: description.textContent,
    url,
    items,
  };
};
