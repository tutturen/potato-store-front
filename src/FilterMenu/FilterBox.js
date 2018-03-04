import React from 'react';
import './FilterBox.css';

function FilterBox(props) {
  return (
    <div className="filterbox-container">
      <div className="filterbox-header">{props.title}</div>
      <div className="filterbox-content">{props.children}</div>
    </div>
  );
}

export default FilterBox;
