// Contains the schema for the User object
module.exports = `
  type User {
    id: ID!
    name: String!
    email: String!
    chats: [PublicChat]
  }
  type Query {
    getMockUser: User,
    getUsers: [User],
    getUser(userName: String!, password: String!): User
  }
  type Mutation {
    createUser(name: String!, email: String!, password: String!, id: ID!): User,
  }
`;
