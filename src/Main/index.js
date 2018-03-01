import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import SignUpPage from '../SignUpPage';
import LogInPage from '../LogInPage';
import ProfilePage from '../ProfilePage';
import ProductPage from '../ProductPage';
import ProductDetailsPage from '../ProductDetailsPage';
import CartPage from '../CartPage';
import CheckoutPage from '../CheckoutPage';

function Main() {
  return (
    <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route path='/sign-up' component={SignUpPage}/>
      <Route path='/log-in' component={LogInPage}/>
      <Route path='/profile' component={ProfilePage}/>
      <Route path='/product-list' component={ProductPage}/>
      <Route path='/product-details' component={ProductDetailsPage}/>
      <Route path='/cart' component={CartPage}/>
      <Route path='/checkout' component={CheckoutPage}/>
    </Switch>
  );
}

export default Main;
