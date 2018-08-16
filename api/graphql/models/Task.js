const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const db = require('../../../db');
const Project = require('./Project');

const Task = new GraphQLObjectType({
  name: 'Task',
  description: 'A task that needs to be done in order to complete the project',
  fields: () => ({
    id: {
      description: 'The id of the task',
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      description: 'The name of the task',
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      description: 'The description of the task',
      type: GraphQLString,
    },
    dueDate: {
      description: 'The time that the task is due',
      type: GraphQLString,
    },
    projectId: {
      description: 'The id of the project this task is in',
      type: new GraphQLNonNull(GraphQLString),
    },
    project: {
      description: 'The project that this task is in',
      type: new GraphQLNonNull(Project),
      resolve: task => {
        return db.get(
          `
          SELECT * FROM Project WHERE id = $projectId
          `,
          { $projectId: task.projectId },
        );
      },
    },
  }),
});

module.exports = Task;