import React from 'react';
import {getFullCart} from '../api/cart';

/**
 * Page showing the current contents of the cart. This also serves the purpose as a confirmation page that lets the
 * user start the check-out process.
 */
class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {products: []};
  }
  componentDidMount() {
    getFullCart().then(function(cart) {
      this.setState({products: cart.products});
    }.bind(this));

  }
  render() {
    const productList = this.state.products.map((p) => <p key={p.id}>{p.name}</p>);
    return <div>
      {productList}
    </div>;
  }
}

export default CartPage;
