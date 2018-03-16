import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import potatoLogo from './potato-logo.svg';
import potatoLogoText from './potato-logo-text.svg';
import shoppingCartIcon from './shopping-cart.svg';
import SearchBar from './SearchBar';

import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';

const HEADER_QUERY = gql`
  query {
    user @client {
      loggedIn
      username
      firstName
      lastName
    }
    cartItems @client
  }
`;

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
    <Query query={HEADER_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error</div>;
        }

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
              <SearchBar text="melk" />
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
                <span className="cart-size">&nbsp;{data.cartItems.length}</span>
              </Link>
            </div>
          </div>
        );
      }}
    </Query>
  );
}

const LOG_OUT = gql`
  mutation {
    logOut @client
  }
`;

export default graphql(LOG_OUT, { name: 'logOut' })(Header);
