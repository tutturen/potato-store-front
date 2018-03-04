import React from 'react';
import { withFormik } from 'formik';
import './LoginPage.css';

/**
 * Page where you log in
 */
class LoginPage extends React.Component {
  render() {
    return <LoginForm onSubmit={form => console.log(form)} />;
  }
}

const InnerLoginForm = ({ values, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className="login-container">
      <div className="login-head-text">Log in to the Potato Store.</div>
      <div className="login-form-element">
        <div className="login-form-element-label">Username</div>
        <input
          autoFocus
          onChange={handleChange}
          name="username"
          type="text"
          className="login-form-element-input"
        />
      </div>
      <div className="login-form-element">
        <div className="login-form-element-label">Password</div>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          className="login-form-element-input"
        />
      </div>
      <input type="submit" className="login-form-button" value="Log in" />
    </div>
  </form>
);

const LoginForm = withFormik({
  handleSubmit: (values, { props }) => {
    props.onSubmit(values);
  },
})(InnerLoginForm);

export default LoginPage;
