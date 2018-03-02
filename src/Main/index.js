import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUpPage from '../SignUpPage';
import LogInPage from '../LogInPage';
import ProductPage from '../ProductPage';
import CartPage from '../CartPage';
import CheckoutPage from '../CheckoutPage';

/**
 * Component with the main routes for the application.
 */
function Main() {
  return (
    <Switch>
      <Route exact path="/" component={ProductPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" component={LogInPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/checkout" component={CheckoutPage} />
    </Switch>
  );
}

export default Main;
