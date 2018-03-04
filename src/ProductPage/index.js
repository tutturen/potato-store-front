import React from 'react';
import { withRouter } from 'react-router';
import DocumentTitle from 'react-document-title';
import PageHeader from '../PageHeader';
import FilterMenu from '../FilterMenu';
import ProductList from '../ProductList';
import milkProducts from '../stories/milkProducts.json';
import { getState } from '../state/urlState';
import { makeApiCall } from '../api/general';
import './ProductPage.css';

const productsQuery = `
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

class ProductPage extends React.Component {
  state = {
    products: [],
    categories: [],
  };

  getUrlData() {
    return getState(this.props.location.search);
  }

  fetchProducts() {
    const urlData = this.getUrlData();
    const variables = {
      minPrice: urlData.minimum || null,
      maxPrice: urlData.maximum || null,
      organic: getBool(urlData.organic),
      onSale: getBool(urlData.onSale),
      text: urlData.query || null,
      category: urlData.category || null,
    };

    makeApiCall(productsQuery, variables).then(res => {
      this.setState({
        products: res.allProducts,
        categories: res.allCategories,
      });
    });
  }

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    const urlData = this.getUrlData();
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
              categories={this.state.categories}
              checkedCategories={urlData.categories}
              onSale={sale}
              organic={organic}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
            <ProductList
              products={this.state.products}
              onBuyProduct={product => console.log(product)}
            />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
export default withRouter(ProductPage);
