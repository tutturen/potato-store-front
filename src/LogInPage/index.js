import React from 'react';
import DocumentTitle from 'react-document-title';

// TODO: Consider two-pane layout where users can register and log in using same page.
/**
 * Page where customers can log into their account.
 */
class LogInPage extends React.Component {
  render() {
    return <DocumentTitle title='Log in - Potato Store'>
      <h1>Hi, this is the login page!</h1>
    </DocumentTitle>;
  }
}

export default LogInPage;
