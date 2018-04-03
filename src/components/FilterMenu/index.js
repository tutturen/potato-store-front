import React from 'react';
import './FilterMenu.css';
import CategoryFilter from './CategoryFilter';
import FilterBox from './FilterBox';
import MinMaxSelect from './MinMaxSelect';
import Properties from './Properties';

function FilterMenu(props) {
  return (
    <div className="filtermenu-container">
      <Properties onSale={props.onSale} organic={props.organic} />

      <FilterBox title="Price">
        <MinMaxSelect minimum={props.minPrice} maximum={props.maxPrice} />
      </FilterBox>

      <CategoryFilter
        categories={props.categories}
        checkedCategories={props.checkedCategories}
      />
    </div>
  );
}

export default FilterMenu;
