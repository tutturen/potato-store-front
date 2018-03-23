import React from 'react';
import { Link } from 'react-router-dom';
import { Query, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import potatoLogo from './potato-logo.svg';
import potatoLogoText from './potato-logo-text.svg';
import shoppingCartIcon from './shopping-cart.svg';
import SearchBar from './SearchBar';
import { query as headerQuery } from '../../queries/header';
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

function Header(props) {
  return (
    <Query query={headerQuery}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error</div>;
        }

        // Summarize the quantity of all products in cart
        const quantities = data.cartItems.map(c => c.quantity);
        const numItems = quantities.reduce((a, b) => a + b, 0);

        return (
          <div className="header-container">
            <div className="header-left-content">
              <Link to="/">
                <img
                  src={potatoLogo}
                  className="potato-logo"
                  alt="Potato Logo"
                />
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
              {data.user.loggedIn ? (
                <LoggedInMessage user={data.user} logOut={props.logOut} />
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
      }}
    </Query>
  );
}

export default compose(withRouter, logout)(Header);
