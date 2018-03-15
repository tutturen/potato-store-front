import React from 'react';
import './ProductList.css';

function getPrice(priceFloat) {
  const overOne = parseInt(priceFloat, 10);
  const belowOne = Math.round((priceFloat - overOne) * 100);
  const belowText = belowOne < 10 ? `0${belowOne}` : belowOne;
  return `kr ${overOne},${belowText}`;
}

function ProductList(props) {
  return (
    <div className="productlist-container">
      <div className="productlist-toptext">
        {props.products.length || 0} products listed
      </div>
      <div className="productlist-products">
        {props.products.map(product => (
          <div className="productlist-item-container" key={product.id}>
            <div
              className="productlist-item"
              key={product.name + product.image}
            >
              <img
                className="productlist-item-image"
                src={product.image}
                alt={product.name}
              />
              <div className="productlist-item-price">
                {getPrice(product.price)}
              </div>
              <div className="productlist-item-name">{product.name}</div>
              <div className="productlist-item-subtitle">
                {product.subtitle}
              </div>
            </div>
            <button
              onClick={() => props.onBuyProduct(product)}
              className="productlist-buy-button"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
