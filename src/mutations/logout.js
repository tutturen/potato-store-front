import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const query = gql`
  mutation {
    logOut @client
  }
`;

const options = {
  props: ({ ownProps, mutate }) => ({
    logOut: () =>
      mutate({
        update: () => {
          ownProps.history.push({ pathname: '/' });
        },
      }),
  }),
};

export default graphql(query, options);
