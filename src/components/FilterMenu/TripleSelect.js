import React from 'react';
import classNames from 'classnames';
import { withFormik } from 'formik';
import './TripleSelect.css';
import setUrlState from '../../state/urlState';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

function TripleSelectForm({ values, handleChange, handleSubmit }) {
  return (
    <div className="tripleselect-container">
      {values.options.map(option => (
        <input
          onClick={handleChange}
          type="submit"
          value={option.value}
          name={values.name}
          key={option.name}
          className={classNames('tripleselect-item', {
            'tripleselect-item-selected': option.name === values.selected,
          })}
        />
      ))}
    </div>
  );
}

const withForm = withFormik({
  mapPropsToValues: props => ({
    options: props.options,
    selected: props.selected,
    name: props.name,
  }),
  enableReinitialize: true,
  validate: (values, props) => {
    const key = values.name;
    const option = values.options.find(option => option.value === values[key]);
    setUrlState(
      {
        [key]: option.name,
      },
      { history: props.history, location: props.location },
    );
  },
});

export default compose(withRouter, withForm)(TripleSelectForm);
