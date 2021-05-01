module.exports = `
  type PublicChat {
    id: ID!
    created: String!
    senderId: ID!
    senderName: String!
    message: String!
  }
  type Query {
    getPublicMockChat: PublicChat,
    getPublicChats: [PublicChat],
  }
  type Mutation {
    createPublicChat(senderId: ID!, senderName: String!, message: String!): PublicChat
  }
  type Subscription {
    getPublicChats: PublicChat,
  }
`;
