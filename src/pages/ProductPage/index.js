import React from 'react';
import { withRouter } from 'react-router';
import DocumentTitle from 'react-document-title';
import { Query, compose } from 'react-apollo';
import PageHeader from '../../components/PageHeader';
import FilterMenu from '../../components/FilterMenu';
import ProductList from '../../components/ProductList';
import { getState } from '../../state/urlState';
import './ProductPage.css';

import addToCart from '../../mutations/addToCart';
import { query as productsQuery } from '../../queries/products';

function getBool(str) {
  if (str === 'yes') {
    return true;
  }
  if (str === 'no') {
    return false;
  }
  return null;
}

function ProductPage(props) {
  const urlData = getState(props.location.search);
  const organic = urlData.organic || 'ignore';
  const sale = urlData.sale || 'ignore';
  const minPrice = urlData.minimum || 0;
  const maxPrice = urlData.maximum || 2000;
  const query = urlData.query || '';
  const title = query ? `Search for "${query}"` : 'All Products';

  const variables = {
    minPrice: urlData.minimum || null,
    maxPrice: urlData.maximum || null,
    organic: getBool(urlData.organic),
    onSale: getBool(urlData.onSale),
    text: urlData.query || null,
    category: urlData.categories || [],
  };

  return (
    <DocumentTitle title={`${title} - Potato Store`}>
      <div>
        <PageHeader title={title} />
        <Query query={productsQuery} variables={variables}>
          {({ loading, error, data }) => {
            return (
              <div className="productpage-row-content">
                <FilterMenu
                  categories={data.allCategories || []}
                  checkedCategories={urlData.categories}
                  onSale={sale}
                  organic={organic}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />
                <ProductList
                  products={data.allProducts || []}
                  onBuyProduct={props.addToCart}
                />
              </div>
            );
          }}
        </Query>
      </div>
    </DocumentTitle>
  );
}

export default compose(addToCart, withRouter)(ProductPage);
