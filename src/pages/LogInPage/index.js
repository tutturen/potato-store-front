import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import './LoginPage.css';
import DocumentTitle from 'react-document-title';
import { compose } from 'react-apollo';
import loginMutation from '../../mutations/login';

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
  touched,
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
        {touched.username &&
          errors.username && (
            <p className="login-form-error">{errors.username}</p>
          )}
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
        {touched.password &&
          errors.password && (
            <p className="login-form-error">{errors.password}</p>
          )}
      </div>
      {errors.generic && <p className="login-form-error">{errors.generic}</p>}
      <input type="submit" className="login-form-button" value="Log in" />
      <div className="login-form-link-text">
        Need an account? <Link to="/signup">Sign up here.</Link>
      </div>
    </div>
  </form>
);

const LoginForm = withFormik({
  validate: (values, props) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  },
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

export default compose(loginMutation, withRouter)(LoginPage);
