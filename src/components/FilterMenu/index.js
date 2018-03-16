import React from 'react';
import './FilterMenu.css';
import CategoryFilter from './CategoryFilter';
import FilterBox from './FilterBox';
import TripleSelect from './TripleSelect';
import MinMaxSelect from './MinMaxSelect';

function FilterMenu(props) {
  return (
    <div className="filtermenu-container">
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