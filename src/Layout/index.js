import React from 'react';
import Header from '../Header';
import Content from '../Content';

/**
 * Component which renders everything "around" the main content.
 */
class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header {...this.props} />
        <Content>{this.props.children}</Content>
      </div>
    );
  }
}

export default Layout;
