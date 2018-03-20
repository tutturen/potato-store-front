import queryString from 'query-string';

function setState(newState, options = {}) {
  console.log('OPTIONS', options);
  const loc = options.location || window.location;
  const query = options && options.flushSearch ? null : loc.search;

  const stringified = queryString.stringify(
    Object.assign({}, queryString.parse(query), newState),
  );

  // use browser history if available, to skip a page refresh
  if (options.history) {
    console.log(`${loc.pathname}?${stringified}`);
    options.history.push({ pathname: loc.pathname, search: stringified });
  } else {
    window.location.search = stringified;
  }
}

export function getState(search = window.location.search) {
  return queryString.parse(search);
}

export default setState;
