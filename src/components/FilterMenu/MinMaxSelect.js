import React from 'react';
import { withFormik } from 'formik';
import './MinMaxSelect.css';
import setUrlState from '../../state/urlState';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

function MinMaxForm({ values, handleChange, handleBlur, errors }) {
  console.log(errors);
  return (
    <div>
      <div className="minmaxselect-container">
        <input
          id="minimum"
          min="0"
          max="50000"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.minimum}
          type="number"
          className="minmaxselect-input"
        />
        <div className="minmaxselect-delimiter">-</div>
        <input
          id="maximum"
          min="0"
          max="50000"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.maximum}
          type="number"
          className="minmaxselect-input"
        />
        <div className="minmaxselect-delimiter">kr</div>
      </div>
      {errors.generic && (
        <div className="minmaxselect-error">{errors.generic}</div>
      )}
      {errors.minimum && (
        <div className="minmaxselect-error">{errors.minimum}</div>
      )}
      {errors.maximum && (
        <div className="minmaxselect-error">{errors.maximum}</div>
      )}
    </div>
  );
}

const withForm = withFormik({
  mapPropsToValues: props => ({
    minimum: props.minimum,
    maximum: props.maximum,
    intervalId: null,
  }),
  validateOnChange: true,
  validateOnBlur: true,
  validate: (values, props) => {
    const minOverZero = Math.max(values.minimum, 0);
    const maxOverZero = Math.max(values.maximum, 0);
    setUrlState(
      {
        minimum: minOverZero,
        maximum: maxOverZero,
      },
      { history: props.history, location: props.location },
    );

    const errors = {};

    if (maxOverZero < minOverZero) {
      errors.generic = 'Not recommended to have larger minimum than maximum.';
    }

    if (values.minimum < 0) {
      errors.minimum = 'Minimum value should not be negative.';
    }

    if (values.maximum < 0) {
      errors.maximum = 'Maximum value should not be negative.';
    }

    return errors;
  },
});

export default compose(withRouter, withForm)(MinMaxForm);
