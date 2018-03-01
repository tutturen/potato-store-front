import React from 'react';
import './Header.css';
import potatoLogo from './potato-logo.svg';
import potatoLogoText from './potato-logo-text.svg';
import shoppingCartIcon from './shopping-cart.svg';

function SearchBar(props) {
  return (
    <div className="header-search-bar">
      <input className="header-search-bar-input" type="text" value={props.text} />
      <button className="header-search-bar-button">search</button>
    </div>
  );
}

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
