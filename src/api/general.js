const BACKEND_URL = process.env.REACT_APP_BACKEND || 'https://potato-store.herokuapp.com/graphql';

function makeApiCall(query, variables, operationName) {
  if (query === undefined) {
    throw "query argument to makeApiCall is required";
  }
  const body = {'query': query};
  if (operationName) {
    body.operationName = operationName;
  }
  if (variables) {
    body.variables = variables;
  }

  return fetch(BACKEND_URL, {
    method: 'post',
    headers: new Headers({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  }).then(res => res.json())
    .then(function(body) {
      if (body.errors && body.errors.length) {
        throw new Error(JSON.stringify(body.errors));
      }
      return body;
    });
}

export {makeApiCall};