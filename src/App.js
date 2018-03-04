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
    const localStorageValueOrDefault = localStorage.getItem(PRODUCT_LIST_KEY) || '[]';
    // Use immutable List to help us with updating state only through this.setState
    return List(JSON.parse(localStorageValueOrDefault));
  }
  _getUserFromLocalStorage() {
    const localStorageValueOrDefault = localStorage.getItem(USER_KEY) || '{}';
    // Use immutable Map to help us with updating state only through this.setState
    return Map(JSON.parse(localStorageValueOrDefault));
  }

  componentDidMount() {
    // componentDidUpdate does not run when mounting the component, so ensure the cart is fetched from back-end
    // upon initialization.
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
      .then((data) => data.cart);
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
      add: this.addProductToCart.bind(this),
      remove: this.removeProductFromCart.bind(this),
      clear: this.clearCart.bind(this),
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
   *
   * Available through props.cart.get('add').
   *
   * @param productID ID of product to add to cart.
   */
  addProductToCart(productID) {
    this.setState((prevState, props) => {
      const newProducts = prevState.products.push(productID);
      this._setLocalProducts(newProducts);
      return {products: this._getProductsFromLocalStorage()};
    });
  }

  /**
   * Remove the given productID from the cart.
   *
   * Available through props.cart.get('remove').
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
      this._setLocalProducts(newProducts);
      return {products: this._getProductsFromLocalStorage()};
    });
  }

  /**
   * Remove all items from the cart.
   *
   * Available through props.cart.get('clear').
   */
  clearCart() {
    this.setState((prevState, props) => {
      this._setLocalProducts(List());
      return {products: this._getProductsFromLocalStorage()};
    });
  }

  _setLocalProducts(products) {
    localStorage.setItem(PRODUCT_LIST_KEY, JSON.stringify(products));
  }

  /**************************************
   * USER FUNCTIONS
   *************************************/
  login({username, password}) {
    const query = `
mutation DoLogin($u: String!, $p: String!) {
  login(username: $u, password: $p) {
    success
    token
    user {
      username
      firstName
      lastName
    }
  }
} 
    `;
    const variables = {
      u: username,
      p: password,
    };
    return makeApiCall(query, variables)
      // Throw if we did not log in
      .then(this._checkSuccessFactory('Wrong username or password'))
      // Save values
      .then(this._handleLoginResponse.bind(this));
  }

  signup({firstName, lastName, username, password}) {
    const query = `
mutation DoAccountCreation($firstName: String!, $lastName: String!, $username: String!, $password: String!) {
  createAccount(firstname: $firstName, lastName: $lastName, username: $username, password: $password) {
    success
    token
    user {
      username
      firstName
      lastName
    }
  }
}
    `;
    const variables = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    };
    return makeApiCall(query, variables)
      .then(this._checkSuccessFactory('Could create account. Make sure all fields are filled!'))
      .then(this._handleLoginResponse.bind(this));
  }

  _checkSuccessFactory(errorMessage) {
    return (body) => {
      if (!body.success) {
        throw new Error(errorMessage);
      }
      return body;
    }
  }

  _handleLoginResponse(body) {
    if (body.token) {
      localStorage.setItem('jwt', body.token);
    }
    if (body.user) {
      this._setLocalUser(body.user);
      this.setState({user: this._getUserFromLocalStorage()});
    }
    return body;
  }

  _setLocalUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

}

export default App;
