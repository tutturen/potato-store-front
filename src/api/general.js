import Cookies from 'js-cookie';

// Remember to update the README.md when changing the available environment variables or their defaults
const BACKEND_URL = process.env.REACT_APP_BACKEND || 'https://potato-store.herokuapp.com';
const CSRF_COOKIE_NAME = process.env.REACT_APP_CSRF_COOKIE || 'csrftoken';  // Django default
const CSRF_HEADER = process.env.REACT_APP_CSRF_HEADER || 'X-CSRFToken';  // Django default

// Variable used to hold a promise which resolves when we've gotten the CSRF token.
// Used as a synchronization mechanism in case more queries should come in while
// waiting for the CSRF token request to come through.
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
    // This code is here to deal with the fact that the user may not have a CSRF token cookie if the user hasn't
    // visited the backend yet. We therefore do an additional request to the backend so that we have a CSRF token to
    // send with our query. That way, we can reassure Django that our queries are done with consent from the user on a
    // site controlled by us, and not triggered by JavaScript on a malicious site.
    if (CSRF_FETCH === false) {
      // We are the first to fetch
      console.info(`Making extra request to back-end to obtain CSRF cookie.`);
      CSRF_FETCH = fetch(BACKEND_URL + '/', {
        credentials: 'include',
        redirect: 'follow',
        mode: 'cors',
      })
        .then((response) => {
          // Ensure we detect errors here, so we don't go into endless recursion.
          // By adding this check to the promise shared between all queries, we
          // avoid doing the same check multiple times.
          if (Cookies.get(CSRF_COOKIE_NAME) === undefined) {
            throw new Error(`The CSRF token cookie ${CSRF_COOKIE_NAME} is not set, even after attempting to fetch it.`);
          }
          return response;
        });
    }
    // Chain so that the query is sent once we have obtained the CSRF token.
    // Since the Promise returned by makeApiCall replaces the resolved promise from
    // the CSRF request, the caller does not see a difference.
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
