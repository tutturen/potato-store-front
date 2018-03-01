import React from 'react';
import { withFormik } from 'formik';

import './Header.css';
import potatoLogo from './potato-logo.svg';
import potatoLogoText from './potato-logo-text.svg';
import shoppingCartIcon from './shopping-cart.svg';

import setUrlState from '../state/urlState';

const SearchForm = ({ values, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className="header-search-bar">
      <input
        autoFocus
        name="query"
        onChange={handleChange}
        className="header-search-bar-input"
        type="text"
        value={values.query}
      />
      <input type="submit" value="search" className="header-search-bar-button" />
    </div>
  </form>
);

// Wrap our form with the using withFormik HoC
const SearchBar = withFormik({
  mapPropsToValues: props => ({ query: props.query }),
  handleSubmit: values => {
    setUrlState(
      {
        query: values.query,
      },
      null,
    );
  },
})(SearchForm);

function Header(props) {
  return (
    <div className="header-container">
      <div className="header-left-content">
        <img src={potatoLogo} className="potato-logo" alt="Potato Logo" />
        <img src={potatoLogoText} className="potato-logo-text" alt="Potato Store" />
      </div>
      <div className="header-middle-content">
        <SearchBar text="melk" />
      </div>
      <div className="header-right-content">
        <img src={shoppingCartIcon} className="shopping-cart-icon" alt="Shopping Cart" />
      </div>
    </div>
  );
}

export default Header;
