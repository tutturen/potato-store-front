import React from 'react';
import './Content.css';

/**
 * Component which takes care of layout specific to the main part of the page.
 * Does not include the header and footer, those are supposed to be siblings.
 */
class Content extends React.Component {
  render() {
    return <div className="content">{this.props.children}</div>;
  }
}

export default Content;
