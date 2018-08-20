import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CollectionView from './collection/components/CollectionView';

function Root() {
  return (
    <Router>
      <Route exact path="/" component={CollectionView} />
    </Router>
  );
}

export default Root;
