import React from 'react';
import classNames from 'classnames';
import './FilterMenu.css';
import CategoryFilter from './CategoryFilter';
import FilterBox from './FilterBox';
import TripleSelect from './TripleSelect';

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
        <TripleSelect
          name="organic"
          options={[
            { name: 'yes', value: 'Yes' },
            { name: 'ignore', value: 'Not important' },
            { name: 'no', value: 'No' },
          ]}
          selected={props.organic}
        />
      </FilterBox>

      <FilterBox title="On Sale">
        <TripleSelect
          name="sale"
          options={[
            { name: 'yes', value: 'Yes' },
            { name: 'ignore', value: 'Not important' },
            { name: 'no', value: 'No' },
          ]}
          selected={props.onSale}
        />
      </FilterBox>
    </div>
  );
}

/*
  <FilterBox title="Price">
  <MinMaxSelect minimum={props.minPrice} maximum={props.maxPrice} />
</FilterBox>

*/

export default FilterMenu;
