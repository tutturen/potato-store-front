import React from 'react';
import DocumentTitle from 'react-document-title';
import PageHeader from '../PageHeader';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

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

// Get the cart from localStorage
const CART_ITEMS_QUERY = gql`
  query {
    cartItems @client
  }
`;

const CART_QUERY = gql`
  query FetchCart($products: [ID!]!) {
    cart(products: $products) {
      products {
        id
        name
        subtitle
        price
        image
      }
      total
      totalDiscount
      totalBeforeDiscount
    }
  }
`;

const BUY_CART = gql`
  mutation PerformPurchase($products: [ID!]!) {
    buy(products: $products) {
      success
    }
  }
`;

export default compose(
  graphql(CART_ITEMS_QUERY),
  graphql(CART_QUERY, {
    options: props => {
      return { variables: { products: props.data.cartItems } };
    },
  }),
  graphql(BUY_CART, {
    props: ({ ownProps, mutate }) => {
      return {
        buyCart() {
          return mutate({
            variables: {
              products: ownProps.data.cart.products.map(prod => prod.id),
            },
            update: (store, response) => {
              if (response.data.buy.success) {
                // Empty cart query
                const cartItemsQuery = gql`
                  query {
                    cartItems @client
                  }
                `;
                store.writeQuery({
                  query: cartItemsQuery,
                  data: { cartItems: [] },
                });
                // Redirect the user to order page
                ownProps.history.push({ pathname: '/order' });
              } else {
                console.error('Buying cart failed', response);
              }
            },
          });
        },
      };
    },
  }),
)(CartPage);
