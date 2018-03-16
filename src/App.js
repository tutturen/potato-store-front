import React from 'react';
import DocumentTitle from 'react-document-title';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { persistCache } from 'apollo-cache-persist';

import Layout from './components/Layout';
import Main from './pages/Main';

import cache from './cache/cache';
import stateLink from './cache/stateLink';
import authLink from './cache/authLink';
import httpLink from './cache/httpLink';

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
