import React from 'react';
import './ProductList.css';
import getPrice from '../../utils/getPrice';
import getSalePrice from '../../utils/getSalePrice';

function ProductListItem(props) {
  const { product } = props;
  const hasSale = product.percentSale.length > 0;
  return (
    <div className="productlist-item-container">
      <div className="productlist-item" key={product.name + product.image}>
        <div
          style={{ backgroundImage: `url(${product.image})` }}
          className="productlist-item-image"
        />
        {hasSale && (
          <div className="productlist-sale-container">
            -{product.percentSale[0].cut}%
          </div>
        )}
        <div className="productlist-item-price-container">
          {hasSale && (
            <div className="productlist-item-prev-price">
              {getPrice(product.price)}
            </div>
          )}
          {hasSale && (
            <div className="productlist-item-sale-price">
              {getSalePrice(product.price, product.percentSale[0].cut)}
            </div>
          )}

          {!hasSale && (
            <div className="productlist-item-price">
              {getPrice(product.price)}
            </div>
          )}
        </div>
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
