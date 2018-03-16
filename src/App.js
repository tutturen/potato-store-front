import React from 'react';
import DocumentTitle from 'react-document-title';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';
import { persistCache } from 'apollo-cache-persist';

import Layout from './Layout';
import Main from './Main';

const cache = new InMemoryCache();

const typeDefs = `
  type UserType {
    id: ID!
    loggedIn: Bool!
    firstName: String
    lastName: String
    username: String
  }

  type Query {
    user: UserType
    cartItems: [Int!]!
  }

  type Mutation {
    addToCart(productId: Int!): Int
  }
`;

const defaultState = {
  user: {
    id: 0,
    __typename: 'UserType',
    loggedIn: false,
    username: 'John',
    firstName: 'John',
    lastName: 'Johnson',
  },
  cartItems: [],
};

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      addToCart: (_, { productId }, { cache }) => {
        const query = gql`
          query GetCartItems {
            cartItems @client
          }
        `;
        const previous = cache.readQuery({ query });
        const data = {
          cartItems: previous.cartItems.concat([productId]),
        };
        cache.writeData({ data });
        return productId;
      },
      logOut: (_, __, { cache }) => {
        cache.writeData({ data: defaultState });
      },
    },
  },
  defaults: defaultState,
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

persistCache({
  cache,
  storage: window.localStorage,
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
