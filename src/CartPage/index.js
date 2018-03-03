import React from 'react';
import {List} from 'immutable';

/**
 * Page showing the current contents of the cart. This also serves the purpose as a confirmation page that lets the
 * user start the check-out process.
 */
class CartPage extends React.Component {
  render() {
    let productList = List();
    if (this.props.cart.products) {
      productList = this.props.cart.products.map((p) => (
        <p key={p.id}>{p.name} <button onClick={() => this.props.cart.remove(p.id)}>Remove</button></p>
      ));
    }
    return <div>
      {productList}
    </div>;
  }
}

export default CartPage;
