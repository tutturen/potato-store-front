import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import './SignUpPage.css';
import DocumentTitle from 'react-document-title';

/**
 * Page where you sign up for a new account.
 */
class SignUpPageWithoutRouter extends React.Component {
  render() {
    return (
      <DocumentTitle title="Sign up - Potato Store">
        <SignupForm
          onSubmit={form => this.handleSubmit(form)}
        />
      </DocumentTitle>
    );
  }

  handleSubmit(form) {
    return this.props.user.get('signup')(form)
      .then(body => {
        // TODO: Take in URL parameter which says where we should redirect on success
        this.props.history.push({pathname: '/cart'});
        return body;
      })
  }
}

const SignUpPage = withRouter(SignUpPageWithoutRouter);

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
    </div>
  </form>
);

const SignupForm = withFormik({
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.onSubmit(values)
      .catch(e => {
        setErrors({
          generic: e.message,
        });
      })
      .then(() => setSubmitting(false));
  },
})(InnerSignupForm);

export default SignUpPage;
