import React from 'react';
import { withFormik } from 'formik';
import './SearchBar.css';
import setUrlState from '../state/urlState';

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

const SearchBar = withFormik({
  mapPropsToValues: props => ({ query: props.query }),
  handleSubmit: values => {
    setUrlState(
      {
        query: values.query,
      },
      null,
    );
  },
})(SearchForm);

export default SearchBar;
