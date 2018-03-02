import React from 'react';
import { withFormik } from 'formik';
import setUrlState from '../state/urlState';
import FilterBox from './FilterBox';
import './CategoryFilter.css';

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

const FilterForm = ({ values, handleChange, handleBlur }) => (
  <FilterBox title="Category">
    <form>
      {values.categories.map(category => (
        <CheckBox
          key={category.name}
          name={category.name}
          text={category.text}
          rightText={category.amount}
          onChange={handleChange}
          onBlur={handleBlur}
          checked={values[category.name]}
        />
      ))}
    </form>
  </FilterBox>
);

const CategoryFilter = withFormik({
  mapPropsToValues: props => {
    const values = props.categories.reduce((acc, cat) => {
      acc[cat.name] = (props.checkedCategories || []).includes(cat.name);
      return acc;
    }, {});

    return {
      categories: props.categories,
      ...values,
    };
  },
  validate: values => {
    const newValues = Object.assign({}, values);
    delete newValues['categories'];
    const keys = Object.keys(newValues).filter(key => newValues[key] === true);
    setUrlState({ categories: keys });
  },
})(FilterForm);

export default CategoryFilter;
