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
  const { image, name, subtitle, percentSale } = product;
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
        {quantity > 1 && (
          <button
            onClick={() => props.removeOneFromCart(product)}
            className="cart-item-quantity-button"
          >
            ▼
          </button>
        )}
      </div>
      <img src={image} className="cart-item-image" alt={name} />
      <div className="cart-item-description">
        <div className="cart-item-description-title">{name}</div>
        <div className="cart-item-description-subtitle">{subtitle}</div>
      </div>
      {percentSale.length > 0 && (
        <div className="cart-item-prev-price">
          {getPrice(originalPrice * quantity)}
        </div>
      )}
      {percentSale.length > 0 && (
        <div className="cart-item-sale-price">
          {getPrice(unitPrice * quantity)}
        </div>
      )}
      {percentSale.length === 0 && (
        <div className="cart-item-price">{getPrice(unitPrice * quantity)}</div>
      )}
      <div className="cart-item-delete-button">
        <DeleteButton onClick={() => props.removeFromCart(product)} />
      </div>
    </div>
  );
}

export default compose(removeFromCart, addOneToCart, removeOneFromCart)(
  CartItem,
);
