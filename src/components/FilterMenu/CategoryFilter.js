import React from 'react';
import { withFormik } from 'formik';
import setUrlState from '../../state/urlState';
import FilterBox from './FilterBox';
import './CategoryFilter.css';
import { withRouter } from 'react-router-dom';
import { compose } from 'react-apollo';

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

const CategoryFilter = ({ values, handleChange, handleBlur }) => {
  return (
    <FilterBox title="Category">
      <form>
        {values.categories.map(category => (
          <CheckBox
            key={category.name}
            name={category.name}
            text={category.name}
            rightText=""
            onChange={handleChange}
            onBlur={handleBlur}
            checked={values[category.name]}
          />
        ))}
      </form>
    </FilterBox>
  );
};

const withForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    const values = props.categories.reduce((acc, cat) => {
      acc[cat.name] = (props.checkedCategories || []).includes(cat.id);
      return acc;
    }, {});

    return {
      categories: props.categories,
      ...values,
    };
  },
  validate: (values, props) => {
    const newValues = Object.assign({}, values);
    delete newValues['categories'];
    const keys = Object.keys(newValues).filter(key => newValues[key] === true);
    const ids = props.categories
      .filter(cat => keys.includes(cat.name))
      .map(cat => cat.id);
    setUrlState(
      { categories: ids },
      { location: props.location, history: props.history },
    );
  },
});

export default compose(withRouter, withForm)(CategoryFilter);
