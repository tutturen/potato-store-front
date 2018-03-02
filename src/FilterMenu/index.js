import React from 'react';
import classNames from 'classnames';
import './FilterMenu.css';
import CategoryFilter from './CategoryFilter';
import FilterBox from './FilterBox';

function TripleSelect(props) {
  return (
    <div className="tripleselect-container">
      {props.options.map(option => (
        <div
          key={option}
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
      <CategoryFilter categories={props.categories} />

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
