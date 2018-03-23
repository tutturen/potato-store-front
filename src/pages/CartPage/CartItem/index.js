import React from 'react';
import getPrice from '../../../utils/getPrice';
import getSalePrice from '../../../utils/getSalePrice';
import DeleteButton from '../DeleteButton';
import removeFromCart from '../../../mutations/removeFromCart';
import { compose } from 'react-apollo';
import './CartItem.css';

function CartItem(props) {
  const { id, image, name, subtitle, price, percentSale } = props.product;
  return (
    <div className="cart-item-container">
      <div className="cart-item-quantity-container">
        <button className="cart-item-quantity-button">▲</button>
        <div className="cart-item-quantity-number">1</div>
        <button className="cart-item-quantity-button">▼</button>
      </div>
      <img src={image} className="cart-item-image" alt={name} />
      <div className="cart-item-description">
        <div className="cart-item-description-title">{name}</div>
        <div className="cart-item-description-subtitle">{subtitle}</div>
      </div>
      {percentSale && (
        <div className="cart-item-prev-price">{getPrice(price)}</div>
      )}
      {percentSale && (
        <div className="cart-item-sale-price">
          {getSalePrice(price, percentSale.cut)}
        </div>
      )}
      {!percentSale && <div className="cart-item-price">{getPrice(price)}</div>}
      <div className="cart-item-delete-button">
        <DeleteButton onClick={() => props.removeFromCart(id)} />
      </div>
    </div>
  );
}

export default compose(removeFromCart)(CartItem);
