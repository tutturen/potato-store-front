import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
  uri: 'http://potato-store.herokuapp.com/graphql',
});

export default httpLink;
