export default (url) => {
  const baseUrl = 'https://allorigins.hexlet.app/get';
  const newUrl = new URL(baseUrl);
  newUrl.searchParams.set('disableCache', 'true');
  newUrl.searchParams.set('url', url);
  return newUrl;
};
