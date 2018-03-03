import React, { Component } from 'react';
import Main from './Main';
import './App.css';
import Layout from './Layout';
import {makeApiCall} from './api/general';
import {List, Map} from 'immutable';


const PRODUCT_LIST_KEY = 'products';
const USER_KEY = 'user';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this._getProductsFromLocalStorage(),
      user: this._getUserFromLocalStorage(),
      cart: Map(),
    };
  }

  _getProductsFromLocalStorage() {
    return List(JSON.parse(localStorage.getItem(PRODUCT_LIST_KEY) || '[]'));
  }
  _getUserFromLocalStorage() {
    return Map(JSON.parse(localStorage.getItem(USER_KEY) || '{}'));
  }

  componentDidMount() {
    this.updateCart();
  }

  componentDidUpdate(prevProps, prevState) {
    // Update cart if out of sync
    if (prevState.products !== this.state.products) {
      this.updateCart();
    }
  }

  updateCart() {
    this._fetchCartFromBackend().then((cart) => {
      this.setState({cart: Map(cart)});
    });
  }

  _fetchCartFromBackend() {
    const query = `
  query FetchCart($products: [ID!]!) {
    cart(products: $products) {
      products {
        id
        name
        subtitle
        image
        price
        unitPrice
        unit
        category {
          name
          id
        }
        organic
        percentSale {
          cut
        }
        packageDeal {
          product {
            id
            name
          }
          paidQuantity
          minimumQuantity
        }
      }
      totalBeforeDiscount
      totalDiscount
      total
    }
  }
  `;
    const variables = {
      products: this.state.products,
    };
    return makeApiCall(query, variables)
      .then((body) => {
        if (body.errors && body.errors.length) {
          console.dir(body.errors);
          throw new Error(`Failed to fetch cart (see error list above)`);
        }
        return body;
      })
      .then((body) => body.data.cart);
  }

  /*_fakeFetchCartFromBackend() {
    return Promise.resolve({
      products: [
        {
          id: '123',
          name: 'Økologiske Egg',
          subtitle: null,
          image: '/media/uploads/public/217/233/186233-974e6-product_list.jpg',
          price: 25.5,
          unitPrice: 63.7,
          unit: 'kg',
          category: [
            {
              id: '123',
              name: 'Egg',
            },
          ],
          organic: true,
          percentSale: null,
          packageDeal: null,
        },
      ],
      totalBeforeDiscount: 25.5,
      totalDiscount: 0.0,
      total: 25.5,
    });
  }*/


  render() {
    // Extend cart object with methods for changing it
    // (We extend cart and not products because products is a list, not an object/Map)
    const cartMethods = Map({
      add: this.addProductToCart,
      remove: this.removeProductFromCart,
      clear: this.clearCart,
    });
    const cart = this.state.cart.merge(cartMethods);

    return (
      <Layout
        products={this.state.products}
        cart={cart}
        user={this.state.user}
      >
        <Main
          products={this.state.products}
          cart={cart}
          user={this.state.user}
        />
      </Layout>
    );
  }

  /**
   * Add productID to the cart.
   * @param productID ID of product to add to cart.
   */
  addProductToCart(productID) {
    this.setState((prevState, props) => {
      const newProducts = prevState.products.push(productID);
      this._setLocalProducts(JSON.stringify(newProducts));
      return {products: this._getProductsFromLocalStorage()};
    });
  }

  /**
   * Remove the given productID from the cart.
   *
   * If the item is not found in the cart, no error is thrown.
   * @param productID ID of product to remove from cart.
   */
  removeProductFromCart(productID) {
    this.setState((prevState, props) => {
      const productIndex = prevState.products.indexOf(productID);
      if (productIndex === -1) {
        console.warn(`Tried removing ${productID} from cart, but no such ID was found.`);
        return {};
      }
      const newProducts = prevState.products.splice(productIndex, 1);
      this._setLocalProducts(JSON.stringify(newProducts));
      return {products: this._getProductsFromLocalStorage()};
    });
  }

  /**
   * Remove all items from the cart.
   */
  clearCart() {
    this.setState((prevState, props) => {
      return {products: List()};
    });
  }

  _setLocalProducts(products) {
    localStorage.setItem(PRODUCT_LIST_KEY, JSON.stringify(products));
  }
}

export default App;
