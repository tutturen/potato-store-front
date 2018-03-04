import React from 'react';
import { List } from 'immutable';
import DocumentTitle from 'react-document-title';

/**
 * Page showing the current contents of the cart. This also serves the purpose as a confirmation page that lets the
 * user start the check-out process.
 */
class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productToAdd: '',
    };

    // Deal with some of the bad parts of JavaScript
    this.handleNewProductChange = this.handleNewProductChange.bind(this);
    this.handleNewProductSubmit = this.handleNewProductSubmit.bind(this);
  }
  handleNewProductChange(e) {
    this.setState({ productToAdd: e.target.value });
  }
  handleNewProductSubmit(e) {
    e.preventDefault();
    this.setState((prevState, prevProps) => {
      if (!prevState.productToAdd) {
        console.warn('Cannot add empty product.');
        return {};
      }
      prevProps.cart.get('add')(prevState.productToAdd);
      return { productToAdd: '' };
    });
  }
  render() {
    let productList = List();
    if (this.props.cart.has('products')) {
      productList = this.props.cart.get('products').map(p => (
        <p key={p.id}>
          {p.name} <button onClick={() => this.props.cart.get('remove')(p.id)}>Remove</button>
        </p>
      ));
    }
    const rawProductList = this.props.products.map(p => (
      <p key={p}>
        {p} <button onClick={() => this.props.cart.get('remove')(p)}>Remove</button>
      </p>
    ));
    return (
      <DocumentTitle title="Your cart - Potato Store">
        <div>
          <form onSubmit={this.handleNewProductSubmit}>
            Add product by ID:{' '}
            <input
              type="text"
              onChange={this.handleNewProductChange}
              value={this.state.productToAdd}
            />
            <input type="submit" value="Add" />
          </form>
          {productList}
          <h3>Raw product list:</h3>
          {rawProductList}
        </div>
      </DocumentTitle>
    );
  }
}

export default CartPage;
