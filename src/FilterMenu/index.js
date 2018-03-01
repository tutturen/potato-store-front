import React from 'react';
import classNames from 'classnames';
import './FilterMenu.css';

function CheckBox(props) {
  return (
    <div className="filterbox-checkbox">
      <label>
        <input type="checkbox" />
        {props.text}
      </label>
    </div>
  );
}

function FilterBox(props) {
  return (
    <div className="filterbox-container">
      <div className="filterbox-header">{props.title}</div>
      <div className="filterbox-content">{props.children}</div>
    </div>
  );
}

function TripleSelect(props) {
  return (
    <div className="tripleselect-container">
      {props.options.map(option => (
        <div
          className={classNames('tripleselect-item', {
            'tripleselect-item-selected': option === props.selected,
          })}
        >
          {option}
        </div>
      ))}
    </div>
  );
}

function MinMaxSelect(props) {
  return (
    <div className="minmaxselect-container">
      <input type="number" className="minmaxselect-input" />
      <div className="minmaxselect-delimiter">-</div>
      <input type="number" className="minmaxselect-input" />
      <div className="minmaxselect-delimiter">kr</div>
    </div>
  );
}

function FilterMenu(props) {
  return (
    <div className="filtermenu-container">
      <FilterBox title="Brand">
        <CheckBox text="Tine" />
        <CheckBox text="Q Meierier" />
        <CheckBox text="Alpro" />
      </FilterBox>

      <FilterBox title="Organic">
        <TripleSelect options={['Yes', 'Not important', 'No']} selected="Not important" />
      </FilterBox>

      <FilterBox title="Price">
        <MinMaxSelect minimum={0} maximum={100} />
      </FilterBox>
    </div>
  );
}

export default FilterMenu;
