import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import potatoLogo from './potato-logo.svg';
import potatoLogoText from './potato-logo-text.svg';
import shoppingCartIcon from './shopping-cart.svg';
import SearchBar from './SearchBar';

function Header(props) {
  let userPart = '';
  if (props.user.has('loggedIn') && props.user.get('loggedIn')) {
    userPart = (
      <p className="user-logged-in">
        Welcome, {props.user.get('firstName')} {props.user.get('lastName')}. (<a
          href=""
          onClick={e => {
            e.preventDefault();
            props.user.get('logout')();
          }}
        >
          Sign out
        </a>)
      </p>
    );
  } else {
    userPart = (
      <p className="user-logged-out">
        <Link to="/login">Log in</Link>
      </p>
    );
  }
  return (
    <div className="header-container">
      <div className="header-left-content">
        <Link to="/">
          <img src={potatoLogo} className="potato-logo" alt="Potato Logo" />
          <img
            src={potatoLogoText}
            className="potato-logo-text"
            alt="Potato Store"
          />
        </Link>
      </div>
      <div className="header-middle-content">
        <SearchBar text="melk" />
      </div>
      <div className="header-user">{userPart}</div>
      <div className="header-right-content">
        <Link to="/cart">
          <img
            src={shoppingCartIcon}
            className="shopping-cart-icon"
            alt="Shopping Cart"
          />
          <span className="cart-size">&nbsp;{props.products.size}</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
