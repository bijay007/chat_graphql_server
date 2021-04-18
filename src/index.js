import "regenerator-runtime/runtime";
import { GraphQLServer } from 'graphql-yoga';
import connectToDB from '../database/connection';

// utils
import config from '../config';
import pubsub from '../graphql/pubsub';
import chalk from 'chalk';

// graphql
import resolvers from '../graphql/resolvers'
import typeDefs from '../graphql/typeDefs';

// Connect to database
connectToDB();

// Create apollo server
const gqlServer = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub },
  middlewares: []
})

// start graphql-express server
gqlServer.start(config, () => console.log(chalk.red.bold(`Server is running on port ${config.port}`)))
