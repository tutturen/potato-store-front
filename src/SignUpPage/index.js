import React from 'react';
import DocumentTitle from 'react-document-title';

// TODO: Create generic component with a sign-up form we can embed different places (checkout, login, homepage?) and use it here as well (?)
/**
 * Page where you sign up for a new account.
 */
class SignUpPage extends React.Component {
  render() {
    return <DocumentTitle title='Sign up - Potato Store'>
      <h1>Sign up page? Sign me up!</h1>
    </DocumentTitle>;
  }
}

export default SignUpPage;
