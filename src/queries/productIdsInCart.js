import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const query = gql`
  query {
    cartItems @client
  }
`;

const options = {};

export default graphql(query, options);
