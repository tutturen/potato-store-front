import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import './SignUpPage.css';
import DocumentTitle from 'react-document-title';
import { compose } from 'react-apollo';
import signUpMutation from '../../mutations/signup';

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
          onChange={handleChange}
          name="lastName"
          type="text"
          className="signup-form-element-input"
        />
      </div>
      <div className="signup-form-element">
        <div className="signup-form-element-label">E-mail</div>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          className="signup-form-element-input"
        />
      </div>
      <div className="signup-form-element">
        <div className="signup-form-element-label">Username</div>
        <input
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
        setErrors({ generic: e.message });
      })
      .then(() => setSubmitting(false));
  },
})(InnerSignupForm);

export default compose(signUpMutation, withRouter)(SignUpPage);
