function tryParseXML(xmlString) {
  const parser = new DOMParser();
  const parsererrorNS = parser.parseFromString('INVALID', 'application/xml').getElementsByTagName('parsererror')[0].namespaceURI;
  const dom = parser.parseFromString(xmlString, 'application/xml');
  if (dom.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0) {
    throw new Error('The resource does not contain valid RSS');
  }
  return dom;
}

export default (response, url) => {
  const parsed = tryParseXML(response);
  const channel = parsed.documentElement.children[0];
  const coll = [...channel.children];
  const [title, description] = coll;
  const items = [];
  coll.forEach((el) => {
    if (el.tagName === 'item') {
      let tl;
      let link;
      let desc;
      const children = [...el.children];
      children.forEach((element) => {
        if (element.tagName === 'title') {
          tl = element;
        }
        if (element.tagName === 'description') {
          desc = element;
        }
        if (element.tagName === 'link') {
          link = element;
        }
      });
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
