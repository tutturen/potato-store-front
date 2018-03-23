import React from 'react';
import DocumentTitle from 'react-document-title';
import PageHeader from '../../components/PageHeader';
import { compose } from 'react-apollo';
import './CartPage.css';
import CartItem from './CartItem';
import SummaryRow from './SummaryRow';

import cartItems from '../../queries/cartItems';
import cart from '../../queries/cart';
import buyCart from '../../mutations/buyCart';

/**
 * Page showing the current contents of the cart.
 */
function CartPage(props) {
  const { loading, error, cart } = props.data;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!</div>;
  }

  const { products, total, totalDiscount, totalBeforeDiscount } = cart;
  const hasProducts = products && !!products.length;
  return (
    <DocumentTitle title="Your Cart - Potato Store">
      <div className="cart-container">
        <PageHeader title="Your Cart" />
        <div className="cart-content">
          <div className="cart-content-header">
            <div className="cart-content-header-product">Product</div>
            <div className="cart-content-header-price">Price</div>
          </div>
          {products.map(product => (
            <CartItem key={product.id} product={product} />
          ))}
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
            <button className="cart-buy-button" onClick={props.buyCart}>
              Buy
            </button>
          )}
        </div>
      </div>
    </DocumentTitle>
  );
}

export default compose(cartItems, cart, buyCart)(CartPage);
