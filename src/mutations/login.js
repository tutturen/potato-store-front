import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const query = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
        firstName
        lastName
      }
      success
      token
    }
  }
`;

const options = {
  props: ({ ownProps, mutate }) => ({
    login: values =>
      mutate({
        variables: { username: values.username, password: values.password },
        update: (store, response) => {
          const { token, user, success } = response.data.login;

          // Why do we even bother with a success param if we throw errors
          // when the login fails?
          if (success) {
            localStorage.setItem('jwt', token);

            if (user) {
              const userQuery = gql`
                query {
                  user @client {
                    id
                    username
                    firstName
                    lastName
                    loggedIn
                  }
                }
              `;

              const newUser = Object.assign({}, user, {
                loggedIn: true,
              });

              store.writeQuery({
                query: userQuery,
                data: { user: newUser },
              });
            }

            // Redirect the user to cart page
            ownProps.history.push({ pathname: '/cart' });
            return response;
          }
        },
      }),
  }),
};

export default graphql(query, options);
