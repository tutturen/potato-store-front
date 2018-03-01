import React from 'react';
import './ProductPage.css';

import Header from '../Header';
import PageHeader from '../PageHeader';
import FilterMenu from '../FilterMenu';
import ProductList from '../ProductList';
import milkProducts from '../stories/milkProducts.json';

function ProductPage(props) {
  return (
    <div>
      <Header />
      <div className="productpage-content">
        <PageHeader title="Milk Products" backText="All categories" />
        <div className="productpage-row-content">
          <FilterMenu />
          <ProductList products={milkProducts} />
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
