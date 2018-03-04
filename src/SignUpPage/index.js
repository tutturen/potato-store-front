import React from 'react';
import { withFormik } from 'formik';
import './SignUpPage.css';
import DocumentTitle from 'react-document-title';

/**
 * Page where you sign up for a new account.
 */
class SignUpPage extends React.Component {
  render() {
    return (
      <DocumentTitle title="Sign up - Potato Store">
        <SignupForm onSubmit={form => console.log(form)} />
      </DocumentTitle>
    );
  }
}

const InnerSignupForm = ({ values, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className="signup-container">
      <div className="signup-head-text">Create your Potato Store account.</div>
      <div className="signup-form-element">
        <div className="signup-form-element-label">First Name</div>
        <input
          autoFocus
          onChange={handleChange}
          name="firstname"
          type="text"
          className="signup-form-element-input"
        />
      </div>
      <div className="signup-form-element">
        <div className="signup-form-element-label">Last Name</div>
        <input
          autoFocus
          onChange={handleChange}
          name="lastname"
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
      <input
        type="submit"
        className="signup-form-button"
        value="Create Account"
      />
    </div>
  </form>
);

const SignupForm = withFormik({
  handleSubmit: (values, { props }) => {
    props.onSubmit(values);
  },
})(InnerSignupForm);

export default SignUpPage;
