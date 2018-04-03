import React from 'react';
import './Content.css';

/**
 * Component which takes care of layout specific to the main part of the page.
 * Does not include the header and footer, those are supposed to be siblings.
 */
function Content(props) {
  return <div className="content">{props.children}</div>;
}

export default Content;
