import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

export default function PageNotFoundPage(props) {
  return (
    <DocumentTitle title="Page not found - Potato Store">
      <div>
        <PageHeader title="404 Page not found" />
        <p>The page you accessed cannot be found.</p>
        <p>
          Please try to navigate from our <Link to="/">homepage</Link>.
        </p>
      </div>
    </DocumentTitle>
  );
}
