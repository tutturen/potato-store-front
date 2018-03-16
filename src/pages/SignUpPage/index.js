import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import './SignUpPage.css';
import DocumentTitle from 'react-document-title';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

/**
 * Page where you sign up for a new account.
 */
function SignUpPage(props) {
  return (
    <DocumentTitle title="Sign up - Potato Store">
      <SignupForm onSubmit={props.createAccount} />
    </DocumentTitle>
  );
}

const InnerSignupForm = ({ values, handleChange, handleSubmit, errors }) => (
  <form onSubmit={handleSubmit}>
    <div className="signup-container">
      <div className="signup-head-text">Create your Potato Store account.</div>
      <div className="signup-form-element">
        <div className="signup-form-element-label">First Name</div>
        <input
          autoFocus
          onChange={handleChange}
          name="firstName"
          type="text"
          className="signup-form-element-input"
        />
      </div>
      <div className="signup-form-element">
        <div className="signup-form-element-label">Last Name</div>
        <input
          autoFocus
          onChange={handleChange}
          name="lastName"
          type="text"
          className="signup-form-element-input"
        />
      </div>
      <div className="signup-form-element">
        <div className="signup-form-element-label">Username</div>
        <input
          autoFocus
          onChange={handleChange}
          name="username"
          type="text"
          className="signup-form-element-input"
        />
      </div>
      <div className="signup-form-element">
        <div className="signup-form-element-label">Password</div>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          className="signup-form-element-input"
        />
      </div>
      {errors.generic && <p>{errors.generic}</p>}
      <input
        type="submit"
        className="signup-form-button"
        value="Create Account"
      />
      <div className="signup-form-link-text">
        Already got an account? <Link to="/login">Log in here.</Link>
      </div>
    </div>
  </form>
);

const SignupForm = withFormik({
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    setErrors({});
    props
      .onSubmit(values)
      .catch(e => {
        setErrors({
          generic: e.message,
        });
      })
      .then(() => setSubmitting(false));
  },
})(InnerSignupForm);

const SIGNUP = gql`
  mutation CreateAccount(
    $firstName: String!
    $lastName: String!
    $username: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
    ) {
      success
      token
      user {
        id
        username
        firstName
        lastName
      }
    }
  }
`;

const signUpMutation = graphql(SIGNUP, {
  props: ({ ownProps, mutate }) => ({
    createAccount: ({ username, password, firstName, lastName }) =>
      mutate({
        variables: { username, password, firstName, lastName },
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

export default compose(signUpMutation, withRouter)(SignUpPage);
