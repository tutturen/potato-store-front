import React from 'react';
import './DeleteButton.css';
import thrashIcon from './thrash.svg';

function DeleteButton(props) {
  return (
    <button className="delete-button-container" onClick={props.onClick}>
      <img src={thrashIcon} alt="Remove item" />
    </button>
  );
}

export default DeleteButton;
