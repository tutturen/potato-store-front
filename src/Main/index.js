import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUpPage from '../SignUpPage';
import LogInPage from '../LogInPage';
import ProductPage from '../ProductPage';
import CartPage from '../CartPage';
import OrderPage from '../OrderPage';
import PageNotFoundPage from '../PageNotFoundPage';

/**
 * Component with the main routes for the application.
 */
function Main(props) {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={routeProps => <ProductPage {...routeProps} />}
      />
      <Route
        path="/signup"
        render={routeProps => <SignUpPage {...routeProps} />}
      />
      <Route
        path="/login"
        render={routeProps => <LogInPage {...routeProps} />}
      />
      <Route path="/cart" render={routeProps => <CartPage {...routeProps} />} />
      <Route
        path="/order"
        render={routeProps => <OrderPage {...routeProps} />}
      />
      <Route component={PageNotFoundPage} />
    </Switch>
  );
}

export default Main;
