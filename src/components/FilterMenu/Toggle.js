import React from 'react';
import { withFormik } from 'formik';
import setUrlState from '../../state/urlState';
import CheckBox from './CheckBox';
import { withRouter } from 'react-router-dom';
import { compose } from 'react-apollo';

function Toggle({ values, handleChange, handleBlur }) {
  return (
    <form>
      <CheckBox
        name={values.label}
        text={values.label}
        rightText=""
        onChange={handleChange}
        onBlur={handleBlur}
        checked={values[values.label]}
      />
    </form>
  );
}

const withForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      label: props.label,
      [props.label]: props.checked || false,
    };
  },
  validate: (values, props) => {
    console.dir(values);
    const checked = values[props.label] === true;
    const value = checked ? 'yes' : undefined;
    setUrlState(
      { [props.param]: value },
      { location: props.location, history: props.history },
    );
    return {};
  },
});

export default compose(withRouter, withForm)(Toggle);
