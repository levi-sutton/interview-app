import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CollectionListView from './collection/components/CollectionListView';

function Root() {
  return (
    <Router>
      <Route exact path="/" component={CollectionListView} />
    </Router>
  );
}

export default Root;
