import { GraphQLServer } from 'graphql-yoga';

// utils
import pubsub from '../graphql/pubsub';
import chalk from 'chalk';
import config from '../config';
// graphql
import resolvers from '../graphql/resolvers'
import typeDefs from '../graphql/typeDefs'
// database
import connectToDB from '../database/connection';

// Create apollo server
const gqlServer = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub }
})

connectToDB();
gqlServer.start(config, () => console.log(chalk.red.bold(`Server is running on port ${config.port}`)))
