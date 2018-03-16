import React from 'react';
import getPrice from '../../../utils/getPrice';
import DeleteButton from '../DeleteButton';
import removeFromCart from '../../../mutations/removeFromCart';
import { compose } from 'react-apollo';
import './CartItem.css';

function CartItem(props) {
  const { id, image, name, subtitle, price } = props.product;
  return (
    <div className="cart-item-container">
      <img src={image} className="cart-item-image" alt={name} />
      <div className="cart-item-description">
        <div className="cart-item-description-title">{name}</div>
        <div className="cart-item-description-subtitle">{subtitle}</div>
      </div>
      <div className="cart-item-price">{getPrice(price)}</div>
      <div className="cart-item-delete-button">
        <DeleteButton onClick={() => props.removeFromCart(id)} />
      </div>
    </div>
  );
}

export default compose(removeFromCart)(CartItem);
