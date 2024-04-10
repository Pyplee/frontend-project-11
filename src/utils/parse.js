function tryParseXML(xmlString) {
  const parser = new DOMParser();
  const parsererrorNS = parser.parseFromString('INVALID', 'application/xml').getElementsByTagName('parsererror')[0].namespaceURI;
  const dom = parser.parseFromString(xmlString, 'application/xml');
  if (dom.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0) {
    throw new Error(dom.getElementsByTagNameNS(parsererrorNS, 'parsererror')[0].textContent);
  }
  return dom;
}

export default (response, url) => {
  const dom = tryParseXML(response);
  const channel = dom.documentElement.children[0];
  const coll = [...channel.children];
  const [title, description] = coll;
  const items = Array.from(dom.querySelectorAll('item')).map((el) => ({
    title: el.querySelector('title').textContent,
    link: el.querySelector('link').textContent,
    description: el.querySelector('description').textContent,
  }));
  return {
    title: title.textContent,
    description: description.textContent,
    url,
    items,
  };
};
