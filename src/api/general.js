const BACKEND_URL = process.env.REACT_APP_BACKEND || 'https://potato-store.herokuapp.com/graphql';

function makeApiCall(query, variables, operationName) {
  if (query === undefined) {
    throw new Error("query argument to makeApiCall is required");
  }
  const body = {'query': query};
  if (operationName) {
    body.operationName = operationName;
  }
  if (variables) {
    body.variables = variables;
  }

  const headers = new Headers({
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  });

  const ourJwt = localStorage.getItem('jwt');
  if (ourJwt !== null) {
    headers.set('Authorization', 'Bearer ' + ourJwt);
  }

  return fetch(BACKEND_URL, {
    method: 'post',
    headers: headers,
    body: JSON.stringify(body),
  }).then(res => res.json());
}

export {makeApiCall};