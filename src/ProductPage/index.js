import React from 'react';
import './ProductPage.css';

import PageHeader from '../PageHeader';
import FilterMenu from '../FilterMenu';
import ProductList from '../ProductList';
import milkProducts from '../stories/milkProducts.json';

const data = {
  title: "Search for 'milk'",
  categories: [
    { name: 'fruit-and-vegetables', text: 'Fruit and vegetables', amount: 32, checked: false },
    { name: 'milk', text: 'Milk products', amount: 14, checked: true },
    { name: 'eggs-and-bacon', text: 'Eggs and Bacon', amount: 8, checked: false },
    { name: 'bread', text: 'Bread and rolls', amount: 29, checked: true },
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
  );
}
export default ProductPage;
