import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from '../Header';
import PageHeader from '../PageHeader';
import ProductList from '../ProductList';

import milkProducts from './milkProducts.json';

storiesOf('Header', module).add('with standard props', () => <Header />);

storiesOf('PageHeader', module).add('with standard props', () => (
  <PageHeader title="Milk Products" backText="All categories" />
));

storiesOf('ProductList', module).add('with standard props', () => (
  <ProductList products={milkProducts} />
));
