import { Map, List } from 'immutable';
import filledCart from './filledCart.json';

export const productsFilled = List([0, 3, 2]);
export const cartFilledBase = Map(filledCart);

export const productsEmpty = List([]);
export const cartEmptyBase = Map();

const noop = () => null;

export const cartNoopMethods = Map({
  add: noop,
  remove: noop,
  clear: noop,
});

export const cartFilled = cartFilledBase.merge(cartNoopMethods);
export const cartEmpty = cartEmptyBase.merge(cartNoopMethods);

export const userLoggedIn = Map({
  id: 23,
  firstName: 'Reidar',
  lastName: 'Testesen',
  username: 'reidetest',
  loggedIn: true,
  logout: noop,
});
export const userNotLoggedIn = Map();

export const threeItemsInCartProps = {
  products: productsFilled,
  cart: cartFilled,
  user: userNotLoggedIn,
};

export const threeItemsInCartLoggedInProps = {
  products: productsFilled,
  cart: cartFilled,
  user: userLoggedIn,
};

export const emptyProps = {
  products: productsEmpty,
  cart: cartEmpty,
  user: userNotLoggedIn,
};

export const emptyLoggedInProps = {
  products: productsEmpty,
  cart: cartEmpty,
  user: userLoggedIn,
};

// For testing between products being expanded and the new cart being loaded
export const mismatchCartLTProductsProps = {
  products: productsFilled,
  cart: cartEmpty,
  user: userNotLoggedIn,
};

export const mismatchCartLTProductsLoggedInProps = {
  products: productsFilled,
  cart: cartEmpty,
  user: userLoggedIn,
};

// For testing between products being truncated and the new cart being loaded
export const mismatchCartGTProductsProps = {
  products: productsEmpty,
  cart: cartFilled,
  user: userNotLoggedIn,
};

export const mismatchCartGTProductsLoggedInProps = {
  products: productsEmpty,
  cart: cartFilled,
  user: userLoggedIn,
};
