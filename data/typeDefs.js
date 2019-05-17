// Contains the schema for the Chat object as well as the 3 major graphql operations on this Chat data
const typeDefs = `
  type Chat {
    id: String!
    sender: String!
    message: String!
    created: String!
  }
  type Query {
    getMockChat: Chat,
    getChats: [Chat]
  }
  type Mutation {
    createMessage(sender: String!, message: String!): Chat
  }
  type Subscription {
    getMessage: Chat
  }
`
export default typeDefs;
