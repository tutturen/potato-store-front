import React from 'react';
import DocumentTitle from 'react-document-title';
import PageHeader from '../PageHeader';

import './CartPage.css';

function getPrice(priceFloat) {
  const overOne = parseInt(priceFloat, 10);
  const belowOne = Math.round((priceFloat - overOne) * 100);
  const belowText = belowOne < 10 ? `0${belowOne}` : belowOne;
  return `kr ${overOne},${belowText}`;
}

function CartItem(props) {
  const { image, name, subtitle, price } = props.product;

  return (
    <div className="cart-item-container">
      <img src={image} className="cart-item-image" alt={name} />
      <div className="cart-item-description">
        <div className="cart-item-description-title">{name}</div>
        <div className="cart-item-description-subtitle">{subtitle}</div>
      </div>
      <div className="cart-item-price">{getPrice(price)}</div>
    </div>
  );
}

function SummaryRow({ text, amount }) {
  return (
    <div className="summary-row">
      <div className="summary-row-text">{text}</div>
      <div className="summary-row-amount">{getPrice(amount)}</div>
    </div>
  );
}

/**
 * Page showing the current contents of the cart.
 */
class CartPage extends React.Component {
  handleBuy = () => {
    this.props.cart
      .get('buy')()
      .then(() => {
        this.props.history.push({ pathname: '/order' });
      })
      .catch(e => {
        // TODO: Find a way to create custom Error which actually works (subclassing, like on MDN, does not work)
        if (e instanceof Error && e.message === 'Authentication required') {
          this.props.history.push({ pathname: '/login' });
          return;
        }
        throw e;
      });
  };

  render() {
    const { cart } = this.props;
    const productList = cart.get('products') || [];
    const totalBeforeDiscount = cart.get('totalBeforeDiscount') || 0;
    const totalDiscount = cart.get('totalDiscount') || 0;
    const total = cart.get('total') || 0;

    const hasProducts = !!productList.length;

    return (
      <DocumentTitle title="Your Cart - Potato Store">
        <div className="cart-container">
          <PageHeader title="Your Cart" />
          <div className="cart-content">
            <div className="cart-content-header">
              <div className="cart-content-header-product">Product</div>
              <div className="cart-content-header-price">Price</div>
            </div>
            {productList.map(product => <CartItem product={product} />)}
            {!hasProducts && (
              <div className="cart-content-no-items">
                You have no products in your cart.
              </div>
            )}
          </div>
          <div className="cart-summary">
            {totalDiscount > 0 && (
              <SummaryRow
                text="Total before discount:"
                amount={totalBeforeDiscount}
              />
            )}
            {totalDiscount > 0 && (
              <SummaryRow text="Discount:" amount={totalDiscount} />
            )}
            <SummaryRow text="Total:" amount={total} />
            {hasProducts && (
              <button className="cart-buy-button" onClick={this.handleBuy}>
                Buy
              </button>
            )}
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default CartPage;
