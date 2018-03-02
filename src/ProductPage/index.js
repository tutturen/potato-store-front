import React from 'react';
import { withRouter } from 'react-router';
import PageHeader from '../PageHeader';
import FilterMenu from '../FilterMenu';
import ProductList from '../ProductList';
import milkProducts from '../stories/milkProducts.json';
import { getState } from '../state/urlState';
import './ProductPage.css';

const data = {
  title: "Search for 'milk'",
  categories: [
    { name: 'fruit-and-vegetables', text: 'Fruit and vegetables', amount: 32 },
    { name: 'milk', text: 'Milk products', amount: 14 },
    { name: 'eggs-and-bacon', text: 'Eggs and Bacon', amount: 8 },
    { name: 'bread', text: 'Bread and rolls', amount: 29 },
  ],
  organic: 'Yes',
  onSale: 'Not important',
  minPrice: 0,
  maxPrice: 20,
  products: milkProducts,
};

function ProductPage(props) {
  const urlData = getState(props.location.search);

  console.log('urlData', urlData);

  return (
    <div>
      <PageHeader title={data.title} />
      <div className="productpage-row-content">
        <FilterMenu
          categories={data.categories}
          checkedCategories={urlData.categories}
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
export default withRouter(ProductPage);
