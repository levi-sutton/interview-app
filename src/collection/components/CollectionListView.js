import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import getCollections from '../../queries/getCollections';

import './CollectionListView.css';

class CollectionListView extends Component {
  state = {
    collections: [],
  }

  componentDidMount() {
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        getCollections(),
      ),
    })
      .then(result => result.json())
      .then(json => {
        this.setState({collections: json.data.collections});
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Collections</h1>
        {this.state.collections.map((collection) => {
          return (<Link className="collectionItem" key={collection.id} to={`/collections/${collection.id}`}>{collection.name}</Link>)
        })}
      </div>
    );
  }
}

export default CollectionListView;
