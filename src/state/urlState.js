import queryString from 'query-string';

function setState(newState, keepOtherParams = true) {
  const query = keepOtherParams ? window.location.search : null;
  const stringified = queryString.stringify(Object.assign({}, queryString.parse(query), newState));

  // might add that we only update if changed
  window.location.search = stringified;
}

export default setState;
