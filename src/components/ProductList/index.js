import React from 'react';
import './ProductList.css';
import getPrice from '../../utils/getPrice';

function ProductListItem(props) {
  const { product } = props;
  return (
    <div className="productlist-item-container">
      <div className="productlist-item" key={product.name + product.image}>
        <img
          className="productlist-item-image"
          src={product.image}
          alt={product.name}
        />
        <div className="productlist-item-price">{getPrice(product.price)}</div>
        <div className="productlist-item-name">{product.name}</div>
        <div className="productlist-item-subtitle">{product.subtitle}</div>
      </div>
      <button
        onClick={() => props.onBuyProduct(product)}
        className="productlist-buy-button"
      >
        Add to cart
      </button>
    </div>
  );
}

function ProductList(props) {
  return (
    <div className="productlist-container">
      <div className="productlist-toptext">
        {props.products.length || 0} products listed
      </div>
      <div className="productlist-products">
        {props.products.map(product => (
          <ProductListItem
            product={product}
            key={product.id}
            onBuyProduct={props.onBuyProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;