const { GraphQLServer } = require('graphql-yoga')

// utils
import pubsub from '../data/pubsub';
import chalk from 'chalk';
import config from '../config';

import resolvers from '../data/resolvers'
import typeDefs from '../data/typeDefs'

// Create apollo server
const gqlServer = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub }
})

gqlServer.start(config, () => console.log(chalk.red.bold(`Server is running on port ${config.port}`)))
