import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Main from './Main';
import './App.css';
import Layout from './Layout';
import { makeApiCall } from './api/general';
import { List, Map } from 'immutable';

const PRODUCT_LIST_KEY = 'products';
const USER_KEY = 'user';

const cartQueryContents = `
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
`;

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
    const localStorageValueOrDefault =
      localStorage.getItem(PRODUCT_LIST_KEY) || '[]';
    // Use immutable List to help us with updating state only through this.setState
    return List(JSON.parse(localStorageValueOrDefault));
  }
  _getUserFromLocalStorage() {
    const localStorageValueOrDefault = localStorage.getItem(USER_KEY) || '{}';
    // Use immutable Map to help us with updating state only through this.setState
    const parsed = Map(JSON.parse(localStorageValueOrDefault));
    if (parsed.has('username')) {
      return parsed.set('loggedIn', true);
    } else {
      return parsed.set('loggedIn', false);
    }
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
    this._fetchCartFromBackend().then(cart => {
      this.setState({ cart: Map(cart) });
    });
  }

  _fetchCartFromBackend() {
    const query = `
  query FetchCart($products: [ID!]!) {
    cart(products: $products) {
      ${cartQueryContents}
    }
  }
  `;
    const variables = {
      products: this.state.products,
    };
    return makeApiCall(query, variables).then(data => data.cart);
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
      buy: this.buyCart.bind(this),
    });
    const cart = this.state.cart.merge(cartMethods);

    const userMethods = Map({
      login: this.login.bind(this),
      signup: this.signup.bind(this),
      logout: this.logout.bind(this),
    });
    const user = this.state.user.merge(userMethods);

    return (
      <Layout products={this.state.products} cart={cart} user={user}>
        <DocumentTitle title="Potato Store">
          <Main products={this.state.products} cart={cart} user={user} />
        </DocumentTitle>
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
      return { products: this._getProductsFromLocalStorage() };
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
        console.warn(
          `Tried removing ${productID} from cart, but no such ID was found.`,
        );
        return {};
      }
      const newProducts = prevState.products.splice(productIndex, 1);
      this._setLocalProducts(newProducts);
      return { products: this._getProductsFromLocalStorage() };
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
      return { products: this._getProductsFromLocalStorage() };
    });
  }

  _setLocalProducts(products) {
    localStorage.setItem(PRODUCT_LIST_KEY, JSON.stringify(products));
  }

  /**
   * Buy the current contents of the cart.
   *
   * Returns a promise which resolves to the cart, the way it was when
   * purchased. If the user is not logged in, the promise will be rejected with
   * a MustAuthenticate error (from src/api/error.js).
   */
  buyCart() {
    const query = `
mutation PerformPurchase($products: [ID!]!) {
  buy(products: $products) {
    success
    cart {
      ${cartQueryContents}
    }
  }
}
    `;
    const variables = {
      products: this.state.products,
    };
    return makeApiCall(query, variables)
      .then(body => body.buy)
      .then(buy => {
        if (!buy.success) {
          // Make sure we're in sync with reality
          this.logout();
          throw new Error('Authentication required');
        }
        return buy;
      })
      .then(buy => buy.cart)
      .then(oldCart => {
        this.clearCart();
        return oldCart;
      });
  }
  /**************************************
   * USER FUNCTIONS
   *************************************/
  login({ username, password }) {
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
      u: username || '',
      p: password || '',
    };
    return (
      makeApiCall(query, variables)
        .then(body => body.login)
        // Throw if we did not log in
        .then(this._checkSuccessFactory('Wrong username or password'))
        // Save values
        .then(this._handleLoginResponse.bind(this))
    );
  }

  signup({ firstName, lastName, username, password }) {
    const query = `
mutation DoAccountCreation($firstName: String!, $lastName: String!, $username: String!, $password: String!) {
  createAccount(firstName: $firstName, lastName: $lastName, username: $username, password: $password) {
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
      firstName: firstName || '',
      lastName: lastName || '',
      username: username || '',
      password: password || '',
    };
    return makeApiCall(query, variables)
      .then(body => body.createAccount)
      .then(
        this._checkSuccessFactory(
          'Could create account. Make sure all fields are filled, or pick another username!',
        ),
      )
      .then(this._handleLoginResponse.bind(this));
  }

  _checkSuccessFactory(errorMessage) {
    return result => {
      if (!result.success) {
        throw new Error(errorMessage);
      }
      return result;
    };
  }

  _handleLoginResponse(result) {
    if (result.token) {
      localStorage.setItem('jwt', result.token);
    }
    if (result.user) {
      this._setLocalUser(result.user);
      this.setState({ user: this._getUserFromLocalStorage() });
    }
    return result;
  }

  _setLocalUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('jwt');
    this._setLocalUser(Map());
    this.setState({ user: this._getUserFromLocalStorage() });
  }
}

export default App;