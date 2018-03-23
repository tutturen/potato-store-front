import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';

import { Header } from '../components/Header';
import PageHeader from '../components/PageHeader';
import ProductList from '../components/ProductList';
import FilterMenu from '../components/FilterMenu';
import Layout from '../components/Layout';
import { MemoryRouter } from 'react-router-dom';

import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';

import milkProducts from './milkProducts.json';
import {
  emptyProps,
  threeItemsInCartProps,
  emptyLoggedInProps,
  threeItemsInCartLoggedInProps,
} from './mockedProps';

// Ensure Link elements can be used without error
addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>);

storiesOf('Header', module)
  .add('with initial props', () => (
    <Header
      loading={false}
      data={{
        loading: false,
        error: false,
        user: { loggedIn: false },
        cartItems: [],
      }}
      logOut={() => null}
    />
  ))
  .add('with three items in cart', () => (
    <Header
      loading={false}
      data={{
        loading: false,
        error: false,
        user: { loggedIn: false },
        cartItems: [1, 2, 1],
      }}
      logOut={() => null}
    />
  ))
  .add('with logged in user, no items', () => (
    <Header
      loading={false}
      data={{
        loading: false,
        error: false,
        user: {
          loggedIn: true,
          id: 10,
          firstName: 'Jonas',
          lastName: 'Johnson',
          username: 'jonas-johnson',
        },
        cartItems: [],
      }}
      logOut={() => null}
    />
  ))
  .add('with logged in user, three items', () => (
    <Header
      loading={false}
      data={{
        loading: false,
        error: false,
        user: {
          loggedIn: true,
          id: 10,
          firstName: 'Jonas',
          lastName: 'Johnson',
          username: 'jonas-johnson',
        },
        cartItems: [1, 2, 3],
      }}
      logOut={() => null}
    />
  ));

storiesOf('PageHeader', module).add('with standard props', () => (
  <PageHeader title="Milk Products" backText="All categories" />
));

storiesOf('ProductList', module).add('with standard props', () => (
  <ProductList products={milkProducts} onBuyProduct={() => null} />
));

storiesOf('FilterMenu', module).add('with standard props', () => (
  <FilterMenu />
));

/*storiesOf('ProductPage', module)
  .add('with initial props', () => (
    <Layout {...emptyProps}>
      <ProductPage {...emptyProps} />
    </Layout>
  ))
  .add('with three items in cart', () => (
    <Layout {...threeItemsInCartProps}>
      <ProductPage {...threeItemsInCartProps} />
    </Layout>
  ));

storiesOf('CartPage', module)
  .add('with initial props', () => (
    <Layout {...emptyProps}>
      <CartPage {...emptyProps} />
    </Layout>
  ))
  .add('with three items in cart', () => (
    <Layout {...threeItemsInCartProps}>
      <CartPage {...threeItemsInCartProps} />
    </Layout>
  ));
*/
