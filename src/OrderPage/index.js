import React from 'react';
import DocumentTitle from 'react-document-title';
import PageHeader from '../PageHeader';
import './OrderPage.css';

/**
 * Page which shows the confirmed order of newly purchased products.
 */
class OrderPage extends React.Component {
  render() {
    return (
      <DocumentTitle title="Order - Potato Store">
        <div className="order-container">
          <PageHeader title="Your Order" />
          <div className="order-content">
            <div className="order-emojis">🎉🥔🥔🥔🎉</div>
            <br /> Thanks for shopping at the Potato Store. Please come again!
            <div className="order-emojis">🎉🥔🥔🥔🎉</div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default OrderPage;
