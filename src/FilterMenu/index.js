import React from 'react';
import classNames from 'classnames';
import './FilterMenu.css';

function CheckBox(props) {
  return (
    <div className="filterbox-checkbox">
      <label>
        <input type="checkbox" checked={props.checked} />
        {props.text}
      </label>
      <div className="filterbox-checkbox-right-text">{props.rightText}</div>
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
      <input value={props.minimum} type="number" className="minmaxselect-input" />
      <div className="minmaxselect-delimiter">-</div>
      <input value={props.maximum} type="number" className="minmaxselect-input" />
      <div className="minmaxselect-delimiter">kr</div>
    </div>
  );
}

function FilterMenu(props) {
  return (
    <div className="filtermenu-container">
      <FilterBox title="Category">
        {props.categories.map(category => (
          <CheckBox text={category.name} rightText={category.amount} checked={category.checked} />
        ))}
      </FilterBox>

      <FilterBox title="Organic">
        <TripleSelect options={['Yes', 'Not important', 'No']} selected={props.organic} />
      </FilterBox>

      <FilterBox title="On Sale">
        <TripleSelect options={['Yes', 'Not important', 'No']} selected={props.onSale} />
      </FilterBox>

      <FilterBox title="Price">
        <MinMaxSelect minimum={props.minPrice} maximum={props.maxPrice} />
      </FilterBox>
    </div>
  );
}

export default FilterMenu;
