import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import './LoginPage.css';
import DocumentTitle from 'react-document-title';

/**
 * Page where you log in
 */
class LoginPageWithoutRouter extends React.Component {
  render() {
    return (
      <DocumentTitle title="Log in - Potato Store">
        <LoginForm onSubmit={this.handleSubmit.bind(this)} />
      </DocumentTitle>
    );
  }

  handleSubmit(form) {
    return this.props.user.get('login')(form)
      .then(body => {
        this.props.history.replace({pathname: '/cart'});
        return body;
      });
  }
}

const LoginPage = withRouter(LoginPageWithoutRouter);

const InnerLoginForm = ({ values, handleChange, handleSubmit, errors }) => (
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
      {errors.generic && <p>{errors.generic}</p>}
      <input type="submit" className="login-form-button" value="Log in" />
    </div>
  </form>
);

const LoginForm = withFormik({
  handleSubmit: (values, { props, setErrors, setSubmitting }) => {
    props.onSubmit(values)
      .catch(e => setErrors({generic: e.message}))
      .then(() => setSubmitting(false));
  },
})(InnerLoginForm);

export default LoginPage;
