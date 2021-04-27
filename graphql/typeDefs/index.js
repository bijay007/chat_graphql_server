const { mergeTypeDefs } = require('@graphql-tools/merge');

const publicChatTypedefs = require('./publicChat.js');
const privateChatTypedefs = require('./privateChat.js');
const userTypedefs = require('./user.js');

const listTypeDefs = [
  publicChatTypedefs,
  privateChatTypedefs,
  userTypedefs,
];
const typeDefs = mergeTypeDefs(listTypeDefs);

export default typeDefs;
