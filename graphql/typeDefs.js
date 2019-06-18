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
    senderName: String!
    message: String!
  }
  type Query {
    getMockChat: Chat,
    getMockUser: User,
    getChats: [Chat],
    getUsers: [User],
    getUser(userName: String!): User
  }
  type Mutation {
    createUser(name: String!, email: String!, id: ID!): User,
    createMessage(senderId: ID!, senderName: String!, message: String!): Chat
  }
  type Subscription {
    getMessage: Chat
  }
`
export default typeDefs;
