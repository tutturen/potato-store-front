import React from 'react';
import './ProductPage.css';

import Header from '../Header';
import PageHeader from '../PageHeader';
import FilterMenu from '../FilterMenu';
import ProductList from '../ProductList';
import milkProducts from '../stories/milkProducts.json';

const data = {
  title: "Search for 'milk'",
  categories: [
    { name: 'Fruit and vegetables', amount: 32, checked: false },
    { name: 'Milk products', amount: 14, checked: true },
    { name: 'Eggs and Bacon', amount: 8, checked: false },
    { name: 'Bread and rolls', amount: 29, checked: false },
  ],
  organic: 'Yes',
  onSale: 'Not important',
  minPrice: 0,
  maxPrice: 20,
  products: milkProducts,
};

function ProductPage(props) {
  return (
    <div>
      <Header />
      <div className="productpage-content">
        <PageHeader title={data.title} />
        <div className="productpage-row-content">
          <FilterMenu
            categories={data.categories}
            onSale={data.onSale}
            organic={data.organic}
            minPrice={data.minPrice}
            maxPrice={data.maxPrice}
          />
          <ProductList products={milkProducts} />
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
