import React from 'react';
import getPrice from '../../../utils/getPrice';
import './CartItem.css';

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

export default CartItem;
