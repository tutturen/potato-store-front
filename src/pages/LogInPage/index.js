import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import './LoginPage.css';
import DocumentTitle from 'react-document-title';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

/**
 * Page where you log in
 */
function LoginPage(props) {
  return (
    <DocumentTitle title="Log in - Potato Store">
      <LoginForm onSubmit={props.login} />
    </DocumentTitle>
  );
}

const InnerLoginForm = ({
  values,
  handleChange,
  handleSubmit,
  errors,
  handleBlur,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="login-container">
      <div className="login-head-text">Log in to the Potato Store.</div>
      <div className="login-form-element">
        <div className="login-form-element-label">Username</div>
        <input
          autoFocus
          onChange={handleChange}
          onBlur={handleBlur}
          name="username"
          type="text"
          className="login-form-element-input"
        />
      </div>
      <div className="login-form-element">
        <div className="login-form-element-label">Password</div>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          type="password"
          className="login-form-element-input"
        />
      </div>
      {errors.generic && <p>{errors.generic}</p>}
      <input type="submit" className="login-form-button" value="Log in" />
      <div className="login-form-link-text">
        Need an account? <Link to="/signup">Sign up here.</Link>
      </div>
    </div>
  </form>
);

const LoginForm = withFormik({
  handleSubmit: (values, { props, setErrors, setSubmitting }) => {
    setErrors({});
    props.onSubmit(values).catch(e => {
      if (e.message.includes('enter valid credentials')) {
        setErrors({ generic: 'Wrong username or password' });
      } else {
        setErrors({ generic: e.message });
      }
    });
  },
})(InnerLoginForm);

const LOGIN_MUTATION = gql`
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

const loginMutation = graphql(LOGIN_MUTATION, {
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
});

export default compose(loginMutation, withRouter)(LoginPage);
