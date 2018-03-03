import React from 'react';
import DocumentTitle from 'react-document-title';

/**
 * Page showing the current contents of the cart. This also serves the purpose as a confirmation page that lets the
 * user start the check-out process.
 */
class CartPage extends React.Component {
  render() {
    return <DocumentTitle title='Your cart - Potato Store'>
      <h1>This is the cart.</h1>
    </DocumentTitle>;
  }
}

export default CartPage;
