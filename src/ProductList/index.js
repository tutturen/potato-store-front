import React from 'react';
import './ProductList.css';

function ProductList(props) {
  return (
    <div className="productlist-container">
      <div className="productlist-toptext">{props.products.length || 0} products listed</div>
      <div className="productlist-products">
        {props.products.map(product => (
          <div className="productlist-item">
            <img className="productlist-item-image" src={product.image} />
            <div className="productlist-item-price">{product.price}</div>
            <div className="productlist-item-name">{product.name}</div>
            <div className="productlist-item-subtitle">{product.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
