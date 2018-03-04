import React from 'react';
import DocumentTitle from 'react-document-title';


/**
 * Shared parent of all pages related to the check-out process, in which the customer registers or logs in if not
 * logged in already, confirms details, "pays" and then is shown confirmation.
 */
class CheckoutPage extends React.Component {
  render() {
    return <DocumentTitle title='Checkout - Potato Store'>
      <h1>This is the Checkout Page.</h1>
    </DocumentTitle>;
  }
}

export default CheckoutPage;
