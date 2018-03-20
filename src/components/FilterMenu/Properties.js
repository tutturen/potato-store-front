import React from 'react';
import FilterBox from './FilterBox';
import Toggle from './Toggle';

function Properties(props) {
  return (
    <FilterBox title="Properties">
      <Toggle label="On sale" param="sale" checked={props.onSale === 'yes'} />
      <Toggle
        label="Organic"
        param="organic"
        checked={props.organic === 'yes'}
      />
    </FilterBox>
  );
}

export default Properties;
