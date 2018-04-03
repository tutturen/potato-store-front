import React from 'react';
import getPrice from '../../../utils/getPrice';
import DeleteButton from '../DeleteButton';
import removeFromCart from '../../../mutations/removeFromCart';
import addOneToCart from '../../../mutations/addToCart';
import removeOneFromCart from '../../../mutations/removeOneFromCart';
import { compose } from 'react-apollo';
import './CartItem.css';

function CartItem(props) {
  const { product, quantity, unitPrice, originalPrice } = props.item;
  const { image, name, subtitle, packageDeal } = product;
  const onSale = unitPrice !== originalPrice;
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
      {packageDeal.length > 0 && (
        <div>
          {packageDeal[0].minimumQuantity} for {packageDeal[0].paidQuantity}
        </div>
      )}
      {onSale && (
        <React.Fragment>
          <div className="cart-item-prev-price">
            {getPrice(originalPrice * quantity)}
          </div>
          <div className="cart-item-sale-price">
            {getPrice(unitPrice * quantity)}
          </div>
        </React.Fragment>
      )}
      {!onSale && (
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
