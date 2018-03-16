import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const query = gql`
  mutation {
    logOut @client
  }
`;

const options = { name: 'logOut' };

export default graphql(query, options);
