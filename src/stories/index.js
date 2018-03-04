import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';

import Header from '../Header';
import PageHeader from '../PageHeader';
import ProductList from '../ProductList';
import FilterMenu from '../FilterMenu';
import Layout from '../Layout';
import { MemoryRouter } from 'react-router-dom';

import ProductPage from '../ProductPage';

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
  .add('with initial props', () => <Header {...emptyProps} />)
  .add('with three items in cart', () => <Header {...threeItemsInCartProps} />)
  .add('with logged in user, no items', () => (
    <Header {...emptyLoggedInProps} />
  ))
  .add('with logged in user, three items', () => (
    <Header {...threeItemsInCartLoggedInProps} />
  ));

storiesOf('PageHeader', module).add('with standard props', () => (
  <PageHeader title="Milk Products" backText="All categories" />
));

storiesOf('ProductList', module).add('with standard props', () => (
  <ProductList products={milkProducts} />
));

storiesOf('FilterMenu', module).add('with standard props', () => (
  <FilterMenu />
));

storiesOf('ProductPage', module)
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
