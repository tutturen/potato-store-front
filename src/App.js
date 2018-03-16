import React from 'react';
import DocumentTitle from 'react-document-title';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

import Layout from './Layout';
import Main from './Main';

const cache = new InMemoryCache();

const typeDefs = `
  type User {
    loggedIn: Bool!
    firstName: String
    lastName: String
    username: String
  }

  type Query {
    user: User
    cartItems: [Int!]!
  }
`;

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
    cartItems: [1, 2, 3],
  },
  typeDefs,
});

const httpLink = new HttpLink({
  uri: 'http://potato-store.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('jwt');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, authLink.concat(httpLink)]),
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
