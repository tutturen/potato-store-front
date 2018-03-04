import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import './LoginPage.css';
import DocumentTitle from 'react-document-title';

/**
 * Page where you log in
 */
class LoginPage extends React.Component {
  render() {
    return (
      <DocumentTitle title="Log in - Potato Store">
        <LoginForm onSubmit={this.handleSubmit.bind(this)} />
      </DocumentTitle>
    );
  }

  handleSubmit(form) {
    return this.props.user
      .get('login')(form)
      .then(body => {
        this.props.history.replace({ pathname: '/cart' });
        return body;
      });
  }
}

const InnerLoginForm = ({ values, handleChange, handleSubmit, errors, handleBlur }) => (
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
    props
      .onSubmit(values)
      .catch(e => {
        if (e.graphErrors[0].message.includes('enter valid credentials')) {
          setErrors({generic: 'Wrong username or password'});
        } else {
          setErrors({generic: e.message});
        }
      })
      .then(() => setSubmitting(false));
  },
})(InnerLoginForm);

export default withRouter(LoginPage);
