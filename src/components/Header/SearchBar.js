import React from 'react';
import { withFormik } from 'formik';
import './SearchBar.css';
import setUrlState, { getState } from '../../state/urlState';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const SearchForm = ({ values, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className="header-search-bar">
      <input
        autoFocus
        name="query"
        onChange={handleChange}
        className="header-search-bar-input"
        type="text"
        value={values.query}
      />
      <input
        type="submit"
        value="search"
        className="header-search-bar-button"
      />
    </div>
  </form>
);

const withForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    const urlData = getState(props.location.search);
    return { query: props.query || urlData.query || '' };
  },
  handleSubmit: (values, { props }) => {
    setUrlState(
      {
        query: values.query,
      },
      {
        flushSearch: true,
        location: { pathname: '/' },
        history: props.history,
      },
    );
  },
});

export default compose(withRouter, withForm)(SearchForm);
