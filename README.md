This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Table of Contents

- [Setup](#setup)

## Setup

* Clone the repository
* Run `yarn install`
* Run `sqlite3 db.sqlite3 < scripts/createdb.sql` to populate the database

## Running the app

* Run `yarn start` to run the React application
* Run `yarn api` to run the api
* View the React app at `http://localhost:3000/`

## GraphiQL

The GraphiQL interface is available at `http://localhost:8080/api/graphql` and provides an easy way to test out queries and mutations.

Example query:
```{
  collection(id: "1") {
    name
    id
  }
}```

Example mutation:
```mutation($description: String!, $collectionId: String!, $name: String!) {
  createProject(description: $description, collectionId: $collectionId, name: $name) {
    id
    name
    description
  }
}```
