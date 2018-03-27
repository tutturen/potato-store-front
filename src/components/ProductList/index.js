import React from 'react';
import './ProductList.css';
import getPrice from '../../utils/getPrice';
import getSalePrice from '../../utils/getSalePrice';

function ProductListItem(props) {
  const { product, numInCart } = props;
  const hasPercentSale = product.percentSale.length > 0;
  const hasPackageDeal = product.packageDeal.length > 0;
  return (
    <div className="productlist-item-container">
      <div className="productlist-item" key={product.name + product.image}>
        <div
          style={{ backgroundImage: `url(${product.image})` }}
          className="productlist-item-image"
        />
        {hasPercentSale && (
          <div className="productlist-sale-container">
            -{product.percentSale[0].cut}%
          </div>
        )}
        {hasPackageDeal && (
          <div className="productlist-package-sale-container">
            {product.packageDeal[0].minimumQuantity} for{' '}
            {product.packageDeal[0].paidQuantity}
          </div>
        )}
        <div className="productlist-item-price-container">
          {hasPercentSale && (
            <div className="productlist-item-prev-price">
              {getPrice(product.price)}
            </div>
          )}
          {hasPercentSale && (
            <div className="productlist-item-sale-price">
              {getSalePrice(product.price, product.percentSale[0].cut)}
            </div>
          )}

          {!hasPercentSale && (
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
        {numInCart === 0 && (
          <React.Fragment>Add to cart</React.Fragment>
        )}
        {numInCart > 0 && (
          <React.Fragment>✓ {numInCart} in cart<br/>Add more?</React.Fragment>
        )}
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
        {props.products.map(product => {
          const maybeCartItem = props.cartItems.find(c => c.id === product.id);
          let numInCart = 0;
          if (maybeCartItem) {
            numInCart = maybeCartItem.quantity;
          }

          return (
            <ProductListItem
              product={product}
              key={product.id}
              onBuyProduct={props.onBuyProduct}
              numInCart={numInCart}
            />
          );
        }
        )}
      </div>
    </div>
  );
}

export default ProductList;
