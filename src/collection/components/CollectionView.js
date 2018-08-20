import React, { Component } from 'react';

import getCollections from '../../queries/getCollections';

import './CollectionView.css';

class CollectionView extends Component {
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
        {this.state.collections.map((collection) => {
          return (<div className="collectionItem" key={collection.id}>{collection.name}</div>)
        })}
      </div>
    );
  }
}

export default CollectionView;
