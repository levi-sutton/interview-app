import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CollectionListView from './collection/components/CollectionListView';
import CollectionView from './collection/components/CollectionView';
import NewProjectView from './project/components/NewProjectView';

function Root() {
  return (
    <div className="app">
      <nav className="navbar"></nav>
      <Router>
        <Switch>
          <Route exact path="/" component={CollectionListView} />
          <Route exact path="/collections/:id" component={CollectionView} />
          <Route exact path="/collections/:id/projects/new" component={NewProjectView} />
        </Switch>
      </Router>
    </div>
  );
}

export default Root;
