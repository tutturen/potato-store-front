import React from 'react';
import { withRouter } from 'react-router';
import DocumentTitle from 'react-document-title';
import PageHeader from '../PageHeader';
import FilterMenu from '../FilterMenu';
import ProductList from '../ProductList';
import milkProducts from '../stories/milkProducts.json';
import { getState } from '../state/urlState';
import './ProductPage.css';

const data = {
  categories: [
    { name: 'fruit-and-vegetables', text: 'Fruit and vegetables', amount: 32 },
    { name: 'milk', text: 'Milk products', amount: 14 },
    { name: 'eggs-and-bacon', text: 'Eggs and Bacon', amount: 8 },
    { name: 'bread', text: 'Bread and rolls', amount: 29 },
  ],
  products: milkProducts,
};

function ProductPage(props) {
  const urlData = getState(props.location.search);

  const organic = urlData.organic || 'ignore';
  const sale = urlData.sale || 'ignore';
  const minPrice = urlData.minimum || 0;
  const maxPrice = urlData.maximum || 2000;
  const query = urlData.query || '';
  const title = query ? `Search for "${query}"` : 'All Products';

  return (
    <DocumentTitle title={`${title} - Potato Store`}>
      <div>
        <PageHeader title={title} />
        <div className="productpage-row-content">
          <FilterMenu
            categories={data.categories}
            checkedCategories={urlData.categories}
            onSale={sale}
            organic={organic}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
          <ProductList
            products={milkProducts}
            onBuyProduct={product => props.cart.get('add')(product.id)}
          />
        </div>
      </div>
    </DocumentTitle>
  );
}
export default withRouter(ProductPage);
