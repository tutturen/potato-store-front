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

const emptyCart = {
  items: [],
  total: 0,
  totalDiscount: 0,
  totalBeforeDiscount: 0,
};

function itemComparator(a, b) {
  if (a.product.id < b.product.id) {
    return -1;
  }
  if (a.product.id > b.product.id) {
    return 1;
  }
  return 0;
}

/**
 * Page showing the current contents of the cart.
 */
function CartPage(props) {
  const { loading, error, cart } = props.data;

  if (error) {
    console.dir(error);
    return <div>Error!</div>;
  }

  const { items, total, totalDiscount, totalBeforeDiscount } =
    cart || emptyCart;
  const hasItems = items && !!items.length;
  return (
    <DocumentTitle title="Your Cart - Potato Store">
      <div className="cart-container">
        <PageHeader title="Your Cart" />
        <div className="cart-content">
          <div className="cart-content-header">
            <div className="cart-content-header-product">Product</div>
            <div className="cart-content-header-price">Price</div>
          </div>
          {items
            .slice(0)
            .sort(itemComparator)
            .map(item => <CartItem key={item.product.id} item={item} />)}
          {!hasItems && (
            <div className="cart-content-no-items">
              {!loading && 'You have no products in your cart.'}
              {loading && 'Loading...'}
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
          {hasItems && (
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
