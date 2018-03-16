import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const query = gql`
  query {
    user @client {
      loggedIn
      username
      firstName
      lastName
    }
    cartItems @client
  }
`;

export const options = {};

export default graphql(query, options);
