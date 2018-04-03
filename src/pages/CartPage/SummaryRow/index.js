import React from 'react';
import getPrice from '../../../utils/getPrice';
import './SummaryRow.css';

function SummaryRow({ text, amount }) {
  return (
    <div className="summary-row">
      <div className="summary-row-text">{text}</div>
      <div className="summary-row-amount">{getPrice(amount)}</div>
    </div>
  );
}

export default SummaryRow;
