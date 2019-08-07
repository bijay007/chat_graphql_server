import "regenerator-runtime/runtime";
import { GraphQLServer } from 'graphql-yoga';

// utils
import config from '../config';
import pubsub from '../graphql/pubsub';
import chalk from 'chalk';
// graphql
import resolvers from '../graphql/resolvers'
import typeDefs from '../graphql/typeDefs'
// database
import connectToDB from '../database/connection';

// Connect to database
connectToDB();

// Create apollo server
const gqlServer = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub },
  middlewares: []
})

gqlServer.start(config, () => console.log(chalk.red.bold(`Server is running on port ${config.port}`)))
