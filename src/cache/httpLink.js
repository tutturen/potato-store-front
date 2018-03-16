import { HttpLink } from 'apollo-link-http';

const BACKEND_URL =
  process.env.REACT_APP_BACKEND || 'https://potato-store.herokuapp.com';

const httpLink = new HttpLink({
  uri: BACKEND_URL + '/graphql',
});

export default httpLink;
