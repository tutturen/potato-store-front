import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Main from './Main';
import './App.css';
import Layout from './Layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <DocumentTitle title='Potato Store'>
          <Main/>
        </DocumentTitle>
      </Layout>
    );
  }
}

export default App;
