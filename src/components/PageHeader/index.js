import React from 'react';
import './PageHeader.css';

function PageHeader(props) {
  return (
    <div className="pageheader-container">
      {props.backText && (
        <div className="pageheader-back-text">
          <span className="pageheader-back-icon">◀</span> {props.backText}
        </div>
      )}
      <h1>{props.title}</h1>
    </div>
  );
}

export default PageHeader;
