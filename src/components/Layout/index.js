import React from 'react';
import Header from '../Header';
import Content from '../Content';

/**
 * Component which renders everything "around" the main content.
 */
function Layout(props) {
  return (
    <div>
      <Header />
      <Content>{props.children}</Content>
    </div>
  );
}

export default Layout;
