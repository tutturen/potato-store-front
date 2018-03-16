import React from 'react';
import { withFormik } from 'formik';
import './MinMaxSelect.css';
import setUrlState from '../../state/urlState';

function MinMaxForm({ values, handleChange, handleBlur }) {
  return (
    <div className="minmaxselect-container">
      <input
        id="minimum"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.minimum}
        type="number"
        className="minmaxselect-input"
      />
      <div className="minmaxselect-delimiter">-</div>
      <input
        id="maximum"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.maximum}
        type="number"
        className="minmaxselect-input"
      />
      <div className="minmaxselect-delimiter">kr</div>
    </div>
  );
}

const MinMaxSelect = withFormik({
  mapPropsToValues: props => ({
    minimum: props.minimum,
    maximum: props.maximum,
    intervalId: null,
  }),
  validateOnChange: false,
  validateOnBlur: true,
  validate: values => {
    setUrlState({
      minimum: Math.min(values.minimum, values.maximum),
      maximum: Math.max(values.minimum, values.maximum),
    });
  },
})(MinMaxForm);

export default MinMaxSelect;
