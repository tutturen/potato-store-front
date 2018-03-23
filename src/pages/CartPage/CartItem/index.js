import React from 'react';
import getPrice from '../../../utils/getPrice';
import getSalePrice from '../../../utils/getSalePrice';
import DeleteButton from '../DeleteButton';
import removeFromCart from '../../../mutations/removeFromCart';
import addOneToCart from '../../../mutations/addToCart';
import removeOneFromCart from '../../../mutations/removeOneFromCart';
import { compose } from 'react-apollo';
import './CartItem.css';

function CartItem(props) {
  const { product, quantity, unitPrice, originalPrice } = props.item;
  const { id, image, name, subtitle, price, percentSale } = product;
  return (
    <div className="cart-item-container">
      <div className="cart-item-quantity-container">
        <button
          onClick={() => props.addToCart(product)}
          className="cart-item-quantity-button"
        >
          ▲
        </button>
        <div className="cart-item-quantity-number">{quantity}</div>
        <button
          onClick={() => props.removeOneFromCart(product)}
          className="cart-item-quantity-button"
        >
          ▼
        </button>
      </div>
      <img src={image} className="cart-item-image" alt={name} />
      <div className="cart-item-description">
        <div className="cart-item-description-title">{name}</div>
        <div className="cart-item-description-subtitle">{subtitle}</div>
      </div>
      {percentSale && (
        <div className="cart-item-prev-price">
          {getPrice(originalPrice * quantity)}
        </div>
      )}
      {percentSale && (
        <div className="cart-item-sale-price">
          {getSalePrice(unitPrice * quantity, percentSale.cut)}
        </div>
      )}
      {!percentSale && <div className="cart-item-price">{getPrice(price)}</div>}
      <div className="cart-item-delete-button">
        <DeleteButton onClick={() => props.removeFromCart(id)} />
      </div>
    </div>
  );
}

export default compose(removeFromCart, addOneToCart, removeOneFromCart)(
  CartItem,
);
