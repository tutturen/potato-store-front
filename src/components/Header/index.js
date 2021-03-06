import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import potatoLogo from './potato-logo.svg';
import potatoLogoText from './potato-logo-text.svg';
import shoppingCartIcon from './shopping-cart.svg';
import SearchBar from './SearchBar';
import headerQuery from '../../queries/header';
import logout from '../../mutations/logout';
import './Header.css';

function LoggedInMessage(props) {
  return (
    <p className="user-logged-in">
      Welcome, {props.user.firstName} {props.user.lastName}. (<a
        href=""
        onClick={e => {
          e.preventDefault();
          props.logOut();
        }}
      >
        Sign out
      </a>)
    </p>
  );
}

function LoggedOutMessage(props) {
  return (
    <p className="user-logged-out">
      <Link to="/login">Log in</Link>
    </p>
  );
}

export function Header(props) {
  const { loading, error, user, cartItems } = props.data;
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  const quantities = cartItems.map(c => c.quantity);
  const numItems = quantities.reduce((a, b) => a + b, 0);

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
        <SearchBar />
      </div>
      <div className="header-user">
        {user.loggedIn ? (
          <LoggedInMessage user={user} logOut={props.logOut} />
        ) : (
          <LoggedOutMessage />
        )}
      </div>
      <div className="header-right-content">
        <Link to="/cart">
          <img
            src={shoppingCartIcon}
            className="shopping-cart-icon"
            alt="Shopping Cart"
          />
          <span className="cart-size">&nbsp; Cart ({numItems})</span>
        </Link>
      </div>
    </div>
  );
}

export default compose(withRouter, headerQuery, logout)(Header);
