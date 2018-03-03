import Cookies from 'js-cookie';

// TODO: Document the environment variables you can set
const BACKEND_URL = process.env.REACT_APP_BACKEND || 'https://potato-store.herokuapp.com';
const CSRF_COOKIE_NAME = process.env.REACT_APP_CSRF_COOKIE || 'csrftoken';  // Django default
const CSRF_HEADER = process.env.REACT_APP_CSRF_HEADER || 'X-CSRFToken';  // Django default
let CSRF_FETCH = false;

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

  // Is the CSRF token available to us?
  if (Cookies.get(CSRF_COOKIE_NAME) === undefined) {
    if (CSRF_FETCH === false) {
      // We are the first to fetch
      console.info(`Making extra request to back-end to obtain CSRF cookie.`);
      CSRF_FETCH = fetch(BACKEND_URL + '/', {
        credentials: 'include',
        redirect: 'follow',
        mode: 'cors',
      })
        .then((response) => {
          // Ensure we detect errors here, so we don't go into endless recursion
          if (Cookies.get(CSRF_COOKIE_NAME) === undefined) {
            throw new Error(`The CSRF token cookie ${CSRF_COOKIE_NAME} is not set, even after attempting to fetch it.`);
          }
          return response;
        });
    }
    return CSRF_FETCH.then(() => makeApiCall(query, variables, operationName));
  }

  const headers = new Headers({
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    [CSRF_HEADER]: Cookies.get(CSRF_COOKIE_NAME),
  });

  const ourJwt = localStorage.getItem('jwt');
  if (ourJwt !== null) {
    headers.set('Authorization', 'Bearer ' + ourJwt);
  }

  return fetch(BACKEND_URL + '/graphql/', {
    method: 'post',
    credentials: 'include',
    redirect: 'follow',
    mode: 'cors',
    headers: headers,
    body: JSON.stringify(body),
  }).then(res => res.json());
}

export {makeApiCall};
