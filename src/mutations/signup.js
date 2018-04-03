import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const query = gql`
  mutation CreateAccount(
    $firstName: String!
    $lastName: String!
    $username: String!
    $password: String!
    $mail: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
      email: $email
    ) {
      success
      token
      user {
        id
        username
        firstName
        lastName
        email
      }
    }
  }
`;

export const options = {
  props: ({ ownProps, mutate }) => ({
    createAccount: ({ username, password, firstName, lastName, email }) =>
      mutate({
        variables: { username, password, firstName, lastName, email },
        update: (store, response) => {
          const { token, user, success } = response.data.createAccount;
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
                    email
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
