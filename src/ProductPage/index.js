import React from 'react';
import { withRouter } from 'react-router';
import DocumentTitle from 'react-document-title';
import { Query, compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PageHeader from '../PageHeader';
import FilterMenu from '../FilterMenu';
import ProductList from '../ProductList';
import { getState } from '../state/urlState';
import './ProductPage.css';

const PRODUCTS_QUERY = gql`
  query GetProducts(
    $text: String
    $minPrice: Float
    $maxPrice: Float
    $onSale: Boolean
    $organic: Boolean
    $category: [ID]
  ) {
    allProducts(
      filter: {
        text: $text
        minPrice: $minPrice
        maxPrice: $maxPrice
        onSale: $onSale
        organic: $organic
        category: $category
      }
    ) {
      id
      name
      unit
      price
      subtitle
      image
    }
    allCategories {
      id
      name
    }
  }
`;

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
        <Query query={PRODUCTS_QUERY} variables={variables}>
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

const ADD_TO_CART = gql`
  mutation AddToCart($productId: Int!) {
    addToCart(productId: $productId) @client
  }
`;

export default compose(
  graphql(ADD_TO_CART, {
    props: ({ mutate }) => ({
      addToCart: product => mutate({ variables: { productId: product.id } }),
    }),
  }),
  withRouter,
)(ProductPage);
