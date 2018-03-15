import React from 'react';
import DocumentTitle from 'react-document-title';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

import Layout from './Layout';
import Main from './Main';

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers: {},
  defaults: {
    user: {
      __typename: 'User',
      loggedIn: true,
      username: 'John',
      firstName: 'John',
      lastName: 'Johnson',
    },
    cartItems: [],
  },
});

const httpLink = new HttpLink({
  uri: 'http://potato-store.herokuapp.com/graphql',
});

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, httpLink]),
  cache,
});

export default function App(props) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <DocumentTitle title="Potato Store">
          <Main />
        </DocumentTitle>
      </Layout>
    </ApolloProvider>
  );
}
