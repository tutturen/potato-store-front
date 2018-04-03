import React from 'react';
import './CheckBox.css';

function CheckBox(props) {
  return (
    <div className="filterbox-checkbox">
      <label>
        <input
          type="checkbox"
          onChange={props.onChange}
          onBlur={props.onBlur}
          name={props.name}
          checked={props.checked}
        />
        {props.text}
      </label>
      <div className="filterbox-checkbox-right-text">{props.rightText}</div>
    </div>
  );
}

export default CheckBox;
