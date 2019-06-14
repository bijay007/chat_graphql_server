// Contains the schema for the Chat object as well as the 3 major graphql operations on this Chat data
const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    chats: [Chat]
  }
  type Chat {
    id: ID!
    created: String!
    senderId: ID!
    message: String!
  }
  type Query {
    getMockChat: Chat,
    getMockUser: User,
    getChats: [Chat],
    getUsers: [User]
  }
  type Mutation {
    createUser(name: String!, email: String!): User,
    createMessage(senderId: ID!, message: String!): Chat
  }
  type Subscription {
    getMessage: Chat
  }
`
export default typeDefs;
