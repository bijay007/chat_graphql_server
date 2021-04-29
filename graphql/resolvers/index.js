const { mergeResolvers } = require('@graphql-tools/merge');
const chatResolvers = require('./chatResolvers');
const userResolvers = require('./userResolvers');

const listResolvers = [
  chatResolvers,
  userResolvers,
];

const resolvers = mergeResolvers(listResolvers);

export default resolvers.default; // mergeResolvers returns the merged object with "default" key which graphql-yoga doesn't like
